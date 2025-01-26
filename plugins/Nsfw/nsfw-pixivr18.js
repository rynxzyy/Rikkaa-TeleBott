module.exports = {
    command: ['pixivr18'],
    desc: 'Search for fanart on Pixiv r-18',
    category: ['nsfw'],
    settings: {
        private: true
    },
    async run(m, { ryn, text, scraper, pickRandom }) {
        if (!text) return ryn.reply({ text: 'Where is the query?' }, m)
        ryn.reply({ text: mess.wait }, m)
	    let res = await scraper.pixiv.search(text, true)
        const hasil = pickRandom(res)
        let pp = 
`*[ Pixiv r-18 Search ‼️ ]*
${hasil.caption}
*By* : ${hasil.author}
*Type* : ${hasil.type}`
        let buttons = [
            [
                { text: '🔁', feature: 'pixivr18', data: text },
            ]
        ]
        await ryn.reply({ image: hasil.imageUrl, caption: pp, parse_mode: 'Markdown' }, buttons, m)
    }
}
