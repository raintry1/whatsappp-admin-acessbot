
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WhatsApp Admin Bot</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; color: #333; }
        h1 { color: #25D366; }
        h2 { color: #555; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
        .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 12px; margin-right: 5px; }
        .green { background: #d4edda; color: #155724; }
        .blue { background: #d1ecf1; color: #0c5460; }
        .yellow { background: #fff3cd; color: #856404; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
        th { background: #f8f9fa; }
    </style>
</head>
<body>
    <h1>🤖 WhatsApp Admin Bot</h1>
    <p><strong>A powerful WhatsApp bot for group management with auto-link deletion, admin commands, and pairing code login.</strong></p>
    
    <p>
        <span class="badge green">Node.js 20+</span>
        <span class="badge blue">Baileys v6+</span>
        <span class="badge yellow">MIT License</span>
    </p>
    
    <h2>✨ Features</h2>
    <ul>
        <li>✅ <strong>Auto-Delete Links</strong> – Automatically removes all HTTP/HTTPS/www links from unauthorized users</li>
        <li>✅ <strong>Ping Command</strong> – <code>.ping</code> to check bot status</li>
        <li>✅ <strong>Kick Command</strong> – <code>.kick @user</code> to remove users from groups</li>
        <li>✅ <strong>Delete Command</strong> – <code>.delete</code> (reply to message) to delete any message</li>
        <li>✅ <strong>Pairing Code Login</strong> – No QR code, CLI-only authentication</li>
        <li>✅ <strong>Authorized Users</strong> – Only predefined admins can use commands</li>
    </ul>
    
    <h2>📥 Installation</h2>
    <h3>1️⃣ Clone the Repository</h3>
    <pre><code>git clone https://github.com/YOUR_USERNAME/whatsapp-admin-bot.git
cd whatsapp-admin-bot</code></pre>
    
    <h3>2️⃣ Install Dependencies</h3>
    <pre><code>npm install @whiskeysockets/baileys pino</code></pre>
    
    <h3>3️⃣ Configure Authorized Users</h3>
    <p>Edit <code>bot.js</code> and update the <code>CONFIG</code> object:</p>
    <pre><code>const CONFIG = {
    AUTHORIZED_USERS: ["919979942108", "48459233903"], // Your numbers
    BOT_NAME: "Admin Bot"
};</code></pre>
    
    <h2>🚀 Usage</h2>
    <h3>Start the Bot</h3>
    <pre><code>node bot.js</code></pre>
    
    <h3>First Run</h3>
    <ol>
        <li>Enter your <strong>WhatsApp number</strong> (with country code) when prompted</li>
        <li>Copy the <strong>pairing code</strong> and enter it in WhatsApp:
            <ul>
                <li>Open WhatsApp → <strong>Settings</strong> → <strong>Linked Devices</strong> → <strong>Link a Device</strong></li>
            </ul>
        </li>
    </ol>
    
    <h2>📋 Commands</h2>
    <table>
        <tr><th>Command</th><th>Usage</th><th>Description</th><th>Access</th></tr>
        <tr><td><code>.ping</code></td><td><code>.ping</code></td><td>Check if bot is alive</td><td>✅ Authorized</td></tr>
        <tr><td><code>.kick</code></td><td><code>.kick @user</code></td><td>Remove user from group</td><td>✅ Authorized</td></tr>
        <tr><td><code>.delete</code></td><td>Reply + <code>.delete</code></td><td>Delete any message</td><td>✅ Authorized</td></tr>
    </table>
    <p><em>🔥 Auto-link deletion works for all unauthorized users in groups.</em></p>
    
    <h2>🔧 Technologies</h2>
    <ul>
        <li><a href="https://github.com/WhiskeySockets/Baileys">Baileys</a> – WhatsApp Web API</li>
        <li><a href="https://nodejs.org/">Node.js</a> – Runtime</li>
        <li><a href="https://github.com/pinojs/pino">Pino</a> – Logging</li>
    </ul>
    
    <h2>📜 License</h2>
    <p><strong>MIT License</strong> – Feel free to use, modify, and distribute.</p>
    
    <hr>
    <p><small>✨ Made with ❤️ and JavaScript</small></p>
</body>
</html>
