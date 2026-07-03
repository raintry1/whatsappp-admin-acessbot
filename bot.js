
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

// ======================
// CONFIGURATION
// ======================
const CONFIG = {
    // AAPKE LOGS SE NIKALE GAYE SARE MEMBERS KE ORIGINAL INTERNAL IDs & NUMBERS
    AUTHORIZED_USERS: [
        "41189189394538",   // Aapka active ID
        "182292001628356",  // Group member ID 1
        "186466625957985",  // Group member ID 2
        "218782127653093",  // Group member ID 3
        "20766921859270",   // Group member ID 4
        "107078198796417",  // Group member ID 5
        "227852796616846",  // Group member ID 6
        // Backup ke liye aapke saare phone numbers bhi bina space ke add hain:
        "918407858677", "918168244630", "918969602920", "918927024235",
        "919474029938", "919208759400", "919429621083", "918102708334",
        "918420611159", "918371876135", "919795681839", "919979942108",
        "919286191410", "48459233903"
    ],
    BOT_NAME: "Admin Bot"
};

// Regex to detect ALL links (http/https/www)
const URL_REGEX = /https?:\/\/\S+|www\.\S+/gi;

const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => rl.question(text, (answer) => {
        rl.close();
        resolve(answer);
    }));
};

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
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        generatePairingCode: true
    });

    // PAIRING LOGIC
    if (!sock.authState.creds.registered) {
        console.log("Waiting for connection to be ready...");
        const phoneNumber = await question('Apna WhatsApp Number (With Country Code) daalein: ');

        setTimeout(async () => {
            try {
                let code = await sock.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                console.log('\n\x1b[1m\x1b[33mTERI PAIRING CODE:\x1b[0m \x1b[1m\x1b[32m' + code + '\x1b[0m\n');
            } catch (err) {
                console.error("Pairing Error:", err);
            }
        }, 6000);
    }

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, pairingCode } = update;

        if (pairingCode) {
            const formattedCode = pairingCode?.match(/.{1,4}/g)?.join("-") || pairingCode;
            console.log('\n\x1b[1m\x1b[33mTERI PAIRING CODE:\x1b[0m \x1b[1m\x1b[32m' + formattedCode + '\x1b[0m\n');
        }

        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason !== DisconnectReason.loggedOut) {
                startBot();
            } else {
                console.log("Session Expired. Delete auth_info and try again.");
                process.exit();
            }
        } else if (connection === 'open') {
            console.log('\n\x1b[32m[CONNECTED] Bot ab chal raha hai aur messages listen kar raha hai!\x1b[0m');
        }
    });

    // ======================
    // MESSAGE HANDLER
    // ======================
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;

        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const groupId = msg.key.remoteJid.endsWith('@g.us') ? msg.key.remoteJid : null;
        const isGroupMessage = !!groupId;

        const sender = isGroupMessage ? (msg.key.participant || msg.participant) : msg.key.remoteJid;
        if (!sender) return;

        // Clean sender string to get exact ID/Number
        const senderId = sender.split('@')[0].split(':')[0];

        const text = msg.message.conversation ||
                     msg.message.extendedTextMessage?.text ||
                     msg.message.imageMessage?.caption ||
                     msg.message.videoMessage?.caption || '';

        console.log(`[MSG] From: ${senderId} | Group: ${isGroupMessage} | Text: ${text}`);

        // Check authorized strictly (Shorter internal IDs ko match karega)
        const isAuthorized = CONFIG.AUTHORIZED_USERS.includes(senderId);

        // AUTO-DELETE: LINKS
        const hasLink = URL_REGEX.test(text);
        if (hasLink && !isAuthorized && isGroupMessage) {
            try {
                await sock.sendMessage(groupId, {
                    delete: {
                        remoteJid: groupId,
                        fromMe: false,
                        id: msg.key.id,
                        participant: sender
                    }
                });
                console.log(`🔗 Deleted link from ${senderId}`);

                const warningText = `⚠️ *Notice:* Hello @${senderId},\n\nSharing external links is strictly prohibited in this group.\n\nIf you want to share any important tools, tutorials, or informative content, please contact a *Group Admin* first to obtain permission.\n\nThank you for your cooperation and keeping the community clean! 🙏`;

                await sock.sendMessage(groupId, {
                    text: warningText,
                    mentions: [sender]
                });

            } catch (error) {
                console.error('❌ Error in link auto-delete flow:', error.message);
            }
            return;
        }

        // Agar authorized user nahi hai ya group message nahi hai toh aage commands skip karo
        if (!isAuthorized || !isGroupMessage) return;

        const commandText = text.toLowerCase().trim();

        // 1. .ping
        if (commandText === '.ping') {
            await sock.sendMessage(groupId, { text: '🏓 Pong!' });
        }

        // 2. .kick @user
        if (commandText.startsWith('.kick')) {
            const mentionedUser = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
            if (mentionedUser) {
                const targetId = mentionedUser.split('@')[0].split(':')[0];
                const botId = sock.user.id.split(':')[0].split('@')[0];

                // SELF & OWNER PROTECTION CHECK
                if (targetId === botId) {
                    await sock.sendMessage(groupId, { text: '❌ Abe saale! Mujhe hi nikalega? Main khud ko kick nahi kar sakta! 😂' });
                    return;
                }

                if (CONFIG.AUTHORIZED_USERS.includes(targetId)) {
                    await sock.sendMessage(groupId, { text: '❌ Yeh user mera Owner/Authorized Admin hai. Isko kick karne ki aukaat nahi hai meri!' });
                    return;
                }

                try {
                    await sock.groupParticipantsUpdate(groupId, [mentionedUser], 'remove');
                    await sock.sendMessage(groupId, { text: `✅ *Member [${targetId}] has been kicked successfully!*` });
                } catch (error) {
                    await sock.sendMessage(groupId, { text: '❌ Failed to kick (Make sure bot is Admin): ' + error.message });
                }
            } else {
                await sock.sendMessage(groupId, { text: '⚠️ Tag a user (e.g., .kick @user)' });
            }
        }

        // 3. .delete (reply to a message)
        if (commandText === '.delete') {
            const contextInfo = msg.message.extendedTextMessage?.contextInfo;
            if (contextInfo && contextInfo.stanzaId) {
                try {
                    await sock.sendMessage(groupId, {
                        delete: {
                            remoteJid: groupId,
                            fromMe: contextInfo.participant === sock.user.id.split(':')[0] + '@s.whatsapp.net',
                            id: contextInfo.stanzaId,
                            participant: contextInfo.participant
                        }
                    });
                } catch (error) {
                    await sock.sendMessage(groupId, { text: '❌ Failed to delete (Make sure bot is Admin): ' + error.message });
                }
            } else {
                await sock.sendMessage(groupId, { text: '⚠️ Kisi message ka reply karke .delete likhein!' });
            }
        }
    });

    sock.ev.on('creds.update', saveCreds);
}

startBot();
