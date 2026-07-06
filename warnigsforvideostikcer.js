const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const readline = require("readline");

const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => rl.question(text, (answer) => {
        rl.close();
        resolve(answer);
    }));
};

// ----- DETECT FORBIDDEN MEDIA -----
function detectForbiddenMedia(msg) {
    const m = msg.message;
    if (!m) return null;

    // Video / GIF (videoMessage)
    if (m.videoMessage) {
        return m.videoMessage.gifPlayback ? "GIF" : "Video";
    }
    // Image that is a GIF (some clients)
    if (m.imageMessage && m.imageMessage.gifPlayback === true) {
        return "GIF";
    }
    // Voice Note (audio with ptt)
    if (m.audioMessage && m.audioMessage.ptt === true) {
        return "Voice Note";
    }
    return null;
}

// ----- SHORT WARNING MESSAGE (6 lines) -----
function getWarning(mediaType, senderName) {
    const name = senderName || "User";
    return `
⚠️ *MEDIA RESTRICTION* ⚠️

Dear ${name},

Sending *${mediaType}* is *NOT allowed* in this group.

📌 If it's an *educational tutorial*, contact an admin *privately*.

Otherwise, your message will be *deleted*.

Thank you for your cooperation.
    `.trim();
}

// ----- MAIN BOT -----
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })),
        },
        printQRInTerminal: false,
        logger: pino({ level: "silent" }),
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    });

    // Pairing
    if (!sock.authState.creds.registered) {
        console.log("📱 Enter your WhatsApp number with country code:");
        const phoneNumber = await question('> ');
        setTimeout(async () => {
            try {
                let code = await sock.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                console.log(`\n✅ Pairing Code: ${code}\n`);
            } catch (err) {
                console.error("❌ Pairing failed:", err.message);
            }
        }, 6000);
    }

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason !== DisconnectReason.loggedOut) {
                startBot();
            } else {
                console.log("Session expired. Delete 'auth_info' folder and restart.");
                process.exit();
            }
        } else if (connection === 'open') {
            console.log('\n✅ Bot is ONLINE and monitoring media.\n');
        }
    });

    sock.ev.on('creds.update', saveCreds);

    // ----- MESSAGE HANDLER -----
    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const mediaType = detectForbiddenMedia(msg);
        if (!mediaType) return;

        const sender = msg.pushName || "User";
        const warning = getWarning(mediaType, sender);

        // Send warning
        try {
            await sock.sendMessage(msg.key.remoteJid, { text: warning }, { quoted: msg });
        } catch (_) {}

        // Delete the offending message
        try {
            await sock.sendMessage(msg.key.remoteJid, {
                delete: {
                    remoteJid: msg.key.remoteJid,
                    fromMe: false,
                    id: msg.key.id,
                    participant: msg.key.participant || msg.key.remoteJid
                }
            });
        } catch (_) {}
    });
}

startBot();
