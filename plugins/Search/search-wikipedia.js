const axios = require('axios');
const cheerio = require('cheerio');

let rynn = async (m, { ryn, text }) => {
    if (!text) return ryn.reply({ text: 'Where is the query?' }, m)
    ryn.reply({ text: mess.wait }, m)
    const wiki = await wikipedia(text)
    let cap = 
`*${wiki.title}*

"${wiki.desc}"`
    ryn.reply({ text: cap, parse_mode: 'Markdown' }, m)
}

rynn.command = ['wikipedia', 'wiki']
rynn.desc = 'Search for info on Wikipedia'
rynn.category = ['search']

module.exports = rynn

async function wikipedia(query) {
    try {
        const q = query.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('_')
        
        const { data } = await axios.get(`https://en.m.wikipedia.org/wiki/${q}`)
        const $ = cheerio.load(data)
        
        const result = {
            title: $('h1[id="firstHeading"]').text().trim(),
            desc: $('.mf-section-0 p').text().trim().replace(/\[.*?\]/g, '')
        }
        return result;
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        return error.message;
    }
}