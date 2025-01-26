module.exports = {
    command: ['neko'],
    desc: 'Random neko',
    category: ['anime'],
    async run(m, { ryn, fetchJson }) {
        ryn.reply({ text: mess.wait }, m)
	    const res = await fetchJson('https://api.waifu.pics/sfw/neko')
	    let buttons = [
            [
                { text: '🔁', feature: 'neko' },
            ]
        ]
        await ryn.reply({ image: res.url, caption: `Random Neko-!!` }, buttons, m)
    },
};
