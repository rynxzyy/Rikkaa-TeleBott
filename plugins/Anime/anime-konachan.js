const axios = require('axios');
const cheerio = require('cheerio');

async function konachan() {
    try {
        let { data } = await axios.get('https://konachan.net/post?tags=order%3Arandom')
        let $ = cheerio.load(data)
        let img = []
        $('#post-list-posts a.directlink.largeimg').each((index, element) => {
            const gtw = $(element).attr('href')
            img.push(gtw)
        })
        let imgg = img[Math.floor(Math.random() * img.length)]
        return imgg
    } catch (error) {
        console.error(error)
        return error.message
    }
}

module.exports = {
    command: ['konachan'],
    desc: 'Random konachan',
    category: ['anime'],
    async run(m, { ryn }) {
        try {
            ryn.reply({ text: mess.wait }, m)
            let buttons = [
                [
                    { text: '🔁', feature: 'konachan' },
                ]
            ]
            await ryn.reply({ image: await konachan(), caption: `Random Konachan-!!` }, buttons, m)
        } catch (err) {
            console.log(err)
            ryn.reply({ text: mess.error }, m)
        }
    },
};
