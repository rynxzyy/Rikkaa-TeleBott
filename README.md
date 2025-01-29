# Rikkaa-TeleBott: Your Customizable Telegram Bot Base

Rikkaa-TeleBott is a powerful and flexible Telegram bot base built on top of the excellent `node-telegram-bot-api` library. It's designed to be easily extended and customized, allowing you to create unique and feature-rich Telegram bots.

**Key Features:**

*   **Case System:** Handle user input with a simple and intuitive case-based structure.
*   **Plugin System:** Extend bot functionality with modular plugins.
*   **Easy Customization:** Configure your bot's behavior through the `settings.js` file.
*   **Flexible Message Handling:** Send various message types (text, images, videos, etc.) with ease.
*   **Database Integration** Basic user and group data management.

## Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   A Telegram Bot Token (get one from [@BotFather](https://t.me/BotFather))

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/rynxzyy/Rikkaa-TeleBott
    cd Rikkaa-TeleBott
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure `settings.js`:

    ```javascript
    global.botName = 'Rikkaa'; // Bot Name
    global.banner = './src/settings/banner.jpg'; // Can use path, can also use link
    global.token = 'YOUR_BOT_TOKEN'; // Bot Token (Get it from BotFather)
    global.ownerUsername = 'your_username'; // Owner Username
    global.ownerId = [1234567890]; // Owner ID, can add more than 1

    global.mess = {
      internalerr: 'Internal server error!',
      owner: 'Owner-only feature!',
      group: 'Use in a group!',
      private: 'Use in a private chat!',
      wait: 'Wait...',
      error: 'Oops, an error occurred',
      done: 'Done!'
    };

    String.prototype.capitalize = function () {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    ```

    *   Replace `YOUR_BOT_TOKEN`, `your_username`, and `1234567890` with your actual bot token, your Telegram username and ID.

4.  Run the bot:
    ```bash
    npm start
    ```

## Customization

### `settings.js`

This file is the heart of your bot's configuration. Here you can:

*   Define the bot's name (`botName`).
*   Set a custom banner (`banner`).
*   Add owner IDs (`ownerId`) to restrict certain commands.
*   Customize messages for different scenarios (`mess`).

## Message Sending

### `ryn.reply` (with URLs and Local Paths)

`ryn.reply` is versatile and can handle both URLs and local file paths for sending various media types.

**Examples with URLs:**

1.  **Sending an Image from a URL:**

    ```javascript
    ryn.reply({ image: 'https://example.com/image.jpg', caption: 'Check out this image from the web!' }, m);
    ```

2.  **Sending a Video from a URL:**

    ```javascript
    ryn.reply({ video: 'https://example.com/video.mp4', caption: 'A cool video from a URL!' }, m);
    ```

**Examples with Local Paths:**

1.  **Sending an Image from a Local Path:**

    ```javascript
    ryn.reply({ image: './src/images/banner.jpg', caption: 'Check out this image from my files!' }, m);
    ```

2.  **Sending a Video from a Local Path:**

    ```javascript
    ryn.reply({ video: './media/videos/welcome.mp4', caption: 'A cool video from my server!' }, m);
    ```

3.  **Sending an Audio from a Local Path:**

    ```javascript
    ryn.reply({ audio: './sounds/notification.mp3', caption: 'Listen to this sound!' }, m);
    ```

4.  **Sending a Document from a Local Path:**

    ```javascript
    ryn.reply({ document: './docs/report.pdf', caption: 'Here is the document from my file system.' }, m);
    ```

### `ryn.downloadAndSend` (URLs Only)

`ryn.downloadAndSend` is specifically designed for downloading files from **URLs** and then sending them. It **does not support local file paths**.

**Examples:**

1.  **Downloading and Sending an Image from a URL:**

    ```javascript
    ryn.downloadAndSend({ image: 'https://example.com/image.jpg', caption: 'Downloaded and sent this image!' }, m);
    ```

2.  **Downloading and Sending a Video from a URL with a Custom Filename:**

    ```javascript
    ryn.downloadAndSend({ video: 'https://example.com/video.mp4', caption: 'Downloaded video!', fileName: 'my_cool_video' }, m);
    ```

3. **Downloading and Sending a Document from a URL with an Inline Keyboard Button:**
    ```javascript
    const buttons = [
        [{ text: 'Open URL', url: 'https://example.com/document.pdf' }]
    ];
    
    ryn.downloadAndSend({ document: 'https://example.com/document.pdf', caption: 'Downloaded document!' }, buttons, m);
    ```

**Key Differences and When to Use Which:**

*   **`ryn.reply`:**
    *   Use when you want to send a file directly, either from a URL or a local path.
    *   More efficient for local files as it doesn't involve unnecessary downloading.
*   **`ryn.downloadAndSend`:**
    *   Use when you need to **download** a file from a **URL** first before sending it.
    *   Useful when you don't have the file locally or when you need to ensure you're sending the latest version from a remote source.
    *   **Cannot be used with local file paths.**

**In summary:** If you're working with local files, `ryn.reply` is your go-to function. If you need to download a file from a URL and then send it, use `ryn.downloadAndSend`. If you try to use a local path with `ryn.downloadAndSend`, it will not work as expected since that function is not designed to handle local files.

## Plugin and Case System

### Plugin Structure

**Plugin Type 1 Example:**

```javascript
module.exports = {
  command: ['command'],
  desc: 'desc',
  category: ['category'],
  settings: {
    private: true,
    owner: true,
    group: false
  },
  async run(m, { ryn }) {
    ryn.reply({ text: 'huh?' }, m)
  },
};
```

**Plugin Type 2 Example:**

```javascript
let rynn = async (m, { ryn }) => {
  ryn.reply({ text: `huh?` }, m)
}

rynn.command = ['command']
rynn.desc = 'desc'
rynn.category = ['category']
rynn.settings = {
  private: true,
  owner: true,
  group: false
}

module.exports = rynn
```

### Case System

**Example:**
```javascript
case 'command': {
  if (!m.isOwner) return ryn.reply({ text: mess.owner }, m)
  if (m.isGroup) return ryn.reply({ text: mess.private }, m)
  ryn.reply({ text: 'huh?' }, m)
}
break
```

## Credits

A huge thank you to the developers and contributors of the **`node-telegram-bot-api`** library. This project would not be possible without their fantastic work in creating and maintaining such a powerful and easy-to-use tool for building Telegram bots.

We appreciate their dedication and the open-source spirit that makes projects like this thrive.

Specifically, we would like to acknowledge:

*   **[yagop](https://github.com/yagop)** (YagoPerez) - The original author and maintainer of the `node-telegram-bot-api` library.
*   **All the contributors** who have helped improve the library over time. You can find a list of them here: [https://github.com/yagop/node-telegram-bot-api/graphs/contributors](https://github.com/yagop/node-telegram-bot-api/graphs/contributors)

The `node-telegram-bot-api` library is licensed under the **MIT License**. You can find more information about the project here:

*   **GitHub Repository:** [https://github.com/yagop/node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
*   **NPM Package:** [https://www.npmjs.com/package/node-telegram-bot-api](https://www.npmjs.com/package/node-telegram-bot-api)

Thank you again for making this amazing library available to the community!
