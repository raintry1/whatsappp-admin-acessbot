# 🤖 WhatsApp Admin Access Bot

A powerful WhatsApp automation bot suite featuring group management, automatic link deletion, admin commands, AI chat, OCR, media restrictions, auto-replies, and pairing-code login.

---

## 📁 Project Structure

```text
whatsappp-admin-acessbot/
├── README.md                  # Main documentation
├── admincmdpingdletekick.js   # Admin command bot
├── ai.js                      # AI chatbot
├── menu.js                    # Auto-reply menu bot
├── package.json               # Project dependencies
└── warnigsforvideostikcer.js  # Media restriction bot
```

---

## ✨ Main Features

### 🔧 1. Admin Command Bot

**File:** `admincmdpingdletekick.js`

#### Available Commands

| Command | Description |
|---|---|
| `.ping` | Check bot status |
| `.kick @user` | Remove a user from the group |
| `.delete` | Reply to a message and delete it |

#### Automatic Features

- ✅ **Automatic Link Deletion** — Automatically deletes HTTP, HTTPS, and WWW links sent by unauthorized users.
- ✅ **Authorized User System** — Only predefined authorized admins can use protected commands.
- ✅ **Self Protection** — The bot cannot kick itself.
- ✅ **Owner Protection** — Authorized administrators cannot be removed by the bot.
- ✅ **Automatic Warning System** — Users receive a warning when unauthorized links are detected.

#### Login System

- Pairing-code login
- No QR code required
- CLI-only authentication

---

### 🤖 2. AI Chat Bot

**File:** `ai.js`

#### Available Commands

| Command | Description |
|---|---|
| `.ping` | Check system status |
| `.jid` | Get the current group or user JID |
| `.txt` | Extract text from a replied image using OCR |
| `.ai [question]` | Ask the AI a question |

#### Advanced Features

- ✅ **OCR Support** — Extract text from images using the OCR.space API.
- ✅ **AI Chat** — Generate intelligent responses using the Klyphic API.
- ✅ **Image Context Support** — Reply to an image while asking an AI question.
- ✅ **Automatic Image Processing** — Images can be automatically scanned and processed.

#### API Configuration

```env
OCR_API_KEY=YOUR_OCR_API_KEY
KLYPHIC_TOKEN=YOUR_KLYPHIC_TOKEN
```

> ⚠️ Never upload real API keys or tokens to a public GitHub repository. Use environment variables or a `.env` file and add `.env` to `.gitignore`.

---

### 📋 3. Menu and Auto-Reply Bot

**File:** `menu.js`

#### Main Features

- ✅ Pattern-based automatic replies
- ✅ Group rules display
- ✅ Help and command menu
- ✅ Tutorial resource responses
- ✅ Restricted-word warning system
- ✅ Media-related warning responses
- ✅ Channel and community link responses

#### Supported Patterns

The bot supports more than 50 keyword and message patterns.

#### Greetings

```text
hi
hello
bye
start
stop
ok
```

#### Help Commands

```text
help
please help
menu
cmd
```

#### Group Management

```text
rules
group rules
```

#### Link Detection

```text
www
url
https:
```

#### Restricted Language Detection

The bot can detect configured abusive or restricted words and send warning messages.

#### Thank You Messages

```text
thank you
tnx
tq
thanks
tq sir
```

#### Cybersecurity Learning Topics

The menu bot can provide configured educational resources for topics such as:

- RouterSploit
- Wi-Fi security testing
- Account security awareness
- OTP security awareness
- Website security testing
- iPhone security
- Android security
- Brute-force attack concepts
- Zphisher awareness
- Payload concepts
- Instagram account security
- Snapchat account security

> ⚠️ Use cybersecurity tools and techniques only on systems you own or have explicit permission to test.

#### Media Warning Patterns

```text
👾 GIF
🎤 Voice Message
🎥 Video
📷 Images
📄 Documents
```

#### Channel Links

```text
youtube
channel link
```

---

### 🚫 4. Media Restriction Bot

**File:** `warnigsforvideostikcer.js`

#### Detection Features

- ✅ Video message detection
- ✅ GIF message detection
- ✅ Voice note detection

#### Actions

When unauthorized media is detected, the bot can:

- Send a warning message
- Inform the user about the media restriction
- Ask the user to get permission from an administrator
- Delete restricted media when configured and when the bot has sufficient permissions

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "@google/generative-ai": "^0.24.1",
    "@hapi/boom": "^10.0.1",
    "@whiskeysockets/baileys": "^7.0.0-rc13",
    "axios": "^1.18.1",
    "form-data": "^4.0.6",
    "pino": "^10.3.1",
    "readline": "^1.3.0"
  }
}
```

---

## 📥 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/raintry1/whatsappp-admin-acessbot
cd whatsappp-admin-acessbot
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Bots

#### Admin Command Bot

```bash
node admincmdpingdletekick.js
```

#### AI Chat Bot

```bash
node ai.js
```

#### Menu Bot

```bash
node menu.js
```

#### Media Restriction Bot

```bash
node warnigsforvideostikcer.js
```

---

## 🔧 Configuration

### 1. Admin Command Bot Setup

Open:

```text
admincmdpingdletekick.js
```

Configure the authorized users:

```javascript
const CONFIG = {
    AUTHORIZED_USERS: [
        "YOUR_USER_ID",
        // Add more authorized user IDs here
    ],

    BOT_NAME: "Admin Bot"
};
```

#### How to Get a User ID

You can:

- Send the `.jid` command to the bot.
- Check the required user's JID using the bot's supported group commands.

---

### 2. AI Bot Setup

Open:

```text
ai.js
```

Configure your API credentials securely:

```javascript
const OCR_API_KEY = process.env.OCR_API_KEY;
const KLYPHIC_TOKEN = process.env.KLYPHIC_TOKEN;
```

Create a `.env` file:

```env
OCR_API_KEY=YOUR_OCR_API_KEY
KLYPHIC_TOKEN=YOUR_KLYPHIC_TOKEN
```

Add the following line to `.gitignore`:

```gitignore
.env
```

---

## 🎯 Usage Guide

### 🔹 Admin Command Bot

| Command | Description | Example |
|---|---|---|
| `.ping` | Check bot status | `.ping` |
| `.kick` | Remove a mentioned user | `.kick @user` |
| `.delete` | Delete a replied message | Reply to a message and send `.delete` |

#### Automatic Features

- Unauthorized links are automatically detected.
- The bot can delete unauthorized links when it has admin permissions.
- The user who sends the link receives a warning message.

---

## 🤖 AI Chat Bot Usage

| Command | Description | Example |
|---|---|---|
| `.ping` | Check system status | `.ping` |
| `.jid` | Get JID information | `.jid` |
| `.txt` | Extract text from an image | Reply to image + `.txt` |
| `.ai` | Ask the AI a question | `.ai Explain networking basics` |

---

## 📋 Menu Bot Usage

The bot automatically responds to configured keywords.

### Examples

```text
hi
hello
help
menu
rules
group rules
thank you
youtube
channel link
```

### Example Behavior

```text
hi → Welcome message
help → Help information
menu → Command menu
rules → Group rules
thank you → Thank-you response
```

---

## 🚫 Media Restriction Bot Usage

The bot automatically detects configured media types.

### Video

```text
Video detected
→ Warning message
→ Optional deletion
```

### GIF

```text
GIF detected
→ Warning message
→ Optional deletion
```

### Voice Note

```text
Voice note detected
→ Warning message
→ Optional deletion
```

---

## ⚠️ Important Notes

### Requirements

1. ✅ Make the bot a group admin if moderation features require message deletion or member management.
2. ✅ Use Node.js 20 or newer.
3. ✅ Maintain a stable internet connection for API requests.
4. ✅ Keep API credentials private.
5. ✅ Use the bot responsibly and comply with WhatsApp's applicable terms and policies.

---

## 🔐 Login Process

1. Start the bot.
2. Enter your WhatsApp number with the country code.
3. Wait for the pairing code to be generated.
4. Open WhatsApp's linked-device pairing option.
5. Enter the pairing code.
6. Wait for the bot to connect.

---

## 💾 Session Management

The authentication session is stored in:

```text
auth_info/
```

If the session becomes invalid or expires:

```bash
rm -rf auth_info
```

Then start the bot again and complete the pairing process.

> ⚠️ Deleting `auth_info` removes the saved bot login session.

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---|---|
| `Cannot find module` | Run `npm install` |
| Session expired | Delete `auth_info` and pair again |
| Command not authorized | Check `AUTHORIZED_USERS` configuration |
| Bot cannot delete messages | Make sure the bot account has required group permissions |
| Pairing code not generated | Check the internet connection and wait briefly |
| API response failed | Check API key, token, quota, and network connection |
| OCR not working | Verify the OCR API key and image format |

---

## 📊 Bot Comparison

| Feature | Admin Bot | AI Bot | Menu Bot | Media Bot |
|---|---:|---:|---:|---:|
| Link Deletion | ✅ | ❌ | ❌ | ❌ |
| Admin Commands | ✅ | ❌ | ❌ | ❌ |
| AI Commands | ❌ | ✅ | ❌ | ❌ |
| OCR | ❌ | ✅ | ❌ | ❌ |
| AI Chat | ❌ | ✅ | ❌ | ❌ |
| Auto Reply | ❌ | ❌ | ✅ | ❌ |
| Media Detection | ❌ | ❌ | ❌ | ✅ |
| Warning Messages | ✅ | ❌ | ✅ | ✅ |

---

## 🎓 Advanced Usage

### Run Bots with PM2

Install PM2 globally:

```bash
npm install -g pm2
```

Start the Admin Bot:

```bash
pm2 start admincmdpingdletekick.js --name "admin-bot"
```

Start the AI Bot:

```bash
pm2 start ai.js --name "ai-bot"
```

Start the Menu Bot:

```bash
pm2 start menu.js --name "menu-bot"
```

Start the Media Bot:

```bash
pm2 start warnigsforvideostikcer.js --name "media-bot"
```

### Check Bot Status

```bash
pm2 status
```

### View Logs

```bash
pm2 logs
```

### Monitor All Bots

```bash
pm2 monit
```

### Save the PM2 Process List

```bash
pm2 save
```

---

## 🔒 Security Recommendations

- Never hardcode API keys in source files.
- Never upload `.env` files.
- Never upload session authentication folders.
- Keep the `auth_info` directory private.
- Use environment variables for API credentials.
- Rotate any token that has accidentally been published.
- Restrict admin commands to trusted user IDs.
- Review dependencies regularly.
- Test updates before deploying them to production.

### Recommended `.gitignore`

```gitignore
node_modules/
auth_info/
.env
*.log
```

---

## 📜 License

This project is licensed under the MIT License.

You are free to use, modify, and distribute the project according to the terms of the license.

---

## 🤝 Contribution

Contributions are welcome.

1. ⭐ Star the repository.
2. 🍴 Fork the project.
3. 🌿 Create a new branch.
4. 🛠️ Make your changes.
5. 📤 Submit a pull request.
6. 🐛 Report bugs through repository issues.

---

## 📞 Contact

- **Repository:** `whatsappp-admin-acessbot`
- **Developer:** `raintry1`
- **Team:** HCO — Hackers Colony

---

## ⚖️ Disclaimer

This project is intended for legitimate group administration, automation, education, and authorized security learning.

The developers and contributors are not responsible for misuse of the software. Always obtain proper authorization before testing systems, accounts, networks, or applications that you do not own.

---

## 🙏 Thank You!

Thank you for using the **WhatsApp Admin Access Bot**.

Developed with ❤️ by **Team HCO (Hackers Colony)**.

⭐ If you find this project useful, consider starring the repository and contributing improvements.