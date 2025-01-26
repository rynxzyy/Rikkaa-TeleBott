module.exports = {
    command: ['hneko'],
    desc: 'Random h. neko',
    category: ['nsfw'],
    settings: {
        private: true
    },
    async run(m, { ryn, fetchJson }) {
        ryn.reply({ text: mess.wait }, m)
	    const res = await fetchJson('https://api.waifu.pics/nsfw/neko')
	    let buttons = [
            [
                { text: '🔁', feature: 'hneko' },
            ]
        ]
        await ryn.reply({ image: res.url, caption: `Random Nsfw Neko-!!` }, buttons, m)
    },
};
