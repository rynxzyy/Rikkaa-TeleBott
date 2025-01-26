require('../../settings');
const TelegramBot = require('node-telegram-bot-api');
const chalk = require('chalk');
const { loadDatabase, customMessage } = require('../../src/message');

const DataBase = require('../database');
const database = new DataBase();

let ryn;

async function startBot() {
    if (!ryn) {
        ryn = new TelegramBot(token, { polling: true });
        
        console.log(chalk.bgHex('#90EE90').hex('#333').bold(' Bot Connected-!! '));
        const miscInfo = await ryn.getMe()
        console.log(chalk.white.bold('—————————————————'));
        console.log('Bot Info: ', JSON.stringify(miscInfo, null, 2));
        console.log(chalk.white.bold('—————————————————'));
        
        const loadData = await database.read()
    	if (loadData && Object.keys(loadData).length === 0) {
    		global.db = {
    			users: {},
    			groups: {},
    			...(loadData || {}),
    		}
    		await database.write(global.db)
    	} else {
    		global.db = loadData
    	}
    	setInterval(async () => {
    		if (global.db) await database.write(global.db)
    	}, 5000)
        
        ryn.on('message', async (m) => {
            await customMessage(ryn, m)
        })
        
        require('./main')(ryn);
    }
}

startBot();