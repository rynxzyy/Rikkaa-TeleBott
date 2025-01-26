const fetch = require('node-fetch');

module.exports = {
    command: ['getpb'],
    desc: 'Copy content from pastebin',
    category: ['tools'],
    async run(m, { ryn, text }) {
        if (!text) return ryn.reply({ text: 'Where is the link??' }, m)
        if (!/^https:\/\/pastebin\.com\/[a-zA-Z0-9]+$/.test(text)) return ryn.reply({ text: 'Invalid url-!' }, m)
        ryn.reply({ text: mess.wait }, m)
        const pasteId = text.split('/').pop(); 
        try {
            const response = await fetch(`https://pastebin.com/raw/${pasteId}`);
            if (!response.ok) return ryn.reply({ text: 'Failed to fetch content from Pastebin.' }, m);
            const content = await response.text();
            if (!content) return ryn.reply({ text: 'No content found on Pastebin!' }, m);
            ryn.reply({ text: `\`\`\`\n${content}\n\`\`\``, parse_mode: 'Markdown' }, m);
        } catch (e) {
            console.log(e)
            ryn.reply({ text: mess.error }, m)
        }
    }
}