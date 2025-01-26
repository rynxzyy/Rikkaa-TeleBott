module.exports = {
    command: ['pixiv'],
    desc: 'Search for fanart on Pixiv',
    category: ['anime'],
    async run(m, { ryn, text, scraper, pickRandom }) {
        if (!text) return ryn.reply({ text: 'Where is the query?' }, m)
        ryn.reply({ text: mess.wait }, m)
	    let res = await scraper.pixiv.search(text, false)
        const hasil = pickRandom(res)
        let pp = 
`*[ Pixiv Search ‼️ ]*
${hasil.caption}
*By* : ${hasil.author}
*Type* : ${hasil.type}`
        let buttons = [
            [
                { text: '🔁', callback_data: JSON.stringify({ feature: 'pixiv', data: text }) },
            ]
        ]
        await ryn.reply({ image: hasil.imageUrl, caption: pp, parse_mode: 'Markdown' }, buttons, m)
    }
}
