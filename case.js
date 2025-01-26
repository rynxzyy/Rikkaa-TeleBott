const { fetchJson, clockString, pickRandom, runtime, formatp, executeCommand } = require('./lib/function');

module.exports = {
    async handleCases(m, { ryn, text, command }) {
        try {
            switch (command) {
                case 'thxto': {
                    let cap = `Special thanks to the node-telegram-bot-api developers. Your library is essential to this project!`
                    ryn.reply({ text: cap }, m)
                }
                break;
                
                // fun ——————————————
                
                case 'rate': {
                    let rate = Math.floor(Math.random() * 100)
            		ryn.reply({ text: `Bot Rate : *${rate}%*`, parse_mode: 'Markdown' }, m)
                }
                break
            }
        } catch (err) {
            console.log(err)
    	    ryn.reply({ text: `${err}`, parse_mode: 'Markdown' }, m)
    	}
    }
}
