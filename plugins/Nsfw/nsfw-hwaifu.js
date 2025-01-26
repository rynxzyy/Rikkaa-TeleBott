module.exports = {
    command: ['hwaifu'],
    desc: 'Random h. waifu',
    category: ['nsfw'],
    settings: {
        private: true
    },
    async run(m, { ryn, fetchJson }) {
        ryn.reply({ text: mess.wait }, m)
	    const res = await fetchJson('https://api.waifu.pics/nsfw/waifu')
	    let buttons = [
            [
                { text: '🔁', feature: 'hwaifu' },
            ]
        ]
        await ryn.reply({ image: res.url, caption: `Random Nsfw Waifu-!!` }, buttons, m)
    },
};
