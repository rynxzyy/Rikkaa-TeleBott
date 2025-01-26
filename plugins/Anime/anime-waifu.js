module.exports = {
    command: ['waifu'],
    desc: 'Random waifu',
    category: ['anime'],
    async run(m, { ryn, fetchJson }) {
        ryn.reply({ text: mess.wait }, m)
	    const res = await fetchJson('https://api.waifu.pics/sfw/waifu')
	    let buttons = [
            [
                { text: '🔁', feature: 'waifu' },
            ]
        ]
        await ryn.reply({ image: res.url, caption: `Random Waifu-!!` }, buttons, m)
    },
};
