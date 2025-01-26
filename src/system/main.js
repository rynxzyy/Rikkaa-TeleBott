process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)
require('../../settings');
require('../../lib/scrapeFunc');

const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const util = require('util');

const { fetchJson, clockString, pickRandom, runtime, formatp, executeCommand } = require('../../lib/function');
const { plugins, pluginFileCount } = require('./handler');
const { loadDatabase } = require('../message');
const { handleCases } = require('../../case');

module.exports = async (ryn) => {
    
    // Eval & Log
    
    ryn.on('message', async (m) => {
        
        await loadDatabase(ryn, m)
        
        const chatId = m.chat.id;
        const userId = m.from.id;
        const chatType = m.chat.type;
        
    	if (m.text && m.text.startsWith('=>')) {
		    if (!m.isOwner) return
            function Return(ryuu) {
                gtw = JSON.stringify(ryuu, null, 2)
                gtww = util.format(gtw)
                if (gtw == undefined) {
                    gtww = util.format(ryuu)
                }
                return ryn.reply({ text: `\`\`\`\n${gtww}\n\`\`\``, parse_mode: 'Markdown' }, m);
            }
            try {
                await ryn.reply({ text: `\`\`\`\n${util.format(eval(`(async () => { return ${m.text.slice(3).trim()} })()`))}\n\`\`\``, parse_mode: 'Markdown' }, m);
            } catch (e) {
                await ryn.reply({ text: `\`\`\`\n${String(e)}\n\`\`\``, parse_mode: 'Markdown' }, m);
            }
        }
        if (m.text && m.text.startsWith('$')) {
            if (!m.isOwner) return
            const codeToEval = m.text.slice(1).trim();
            try {
                const result = await executeCommand(codeToEval);
                await ryn.reply({ text: `\`\`\`\n${result}\n\`\`\``, parse_mode: 'Markdown' }, m);
            } catch (error) {
                await ryn.reply({ text: `\`${error.message}\``, parse_mode: 'Markdown' }, m);
            }
        }
        if (m.text && m.text.startsWith('>')) {
            if (!m.isOwner) return
            try {
                const codeToEval = m.text.slice(1).trim();
                const result = await eval(`(async () => { ${codeToEval} })()`);
                let message = result;
                if(typeof result === 'object'){
                    message = JSON.stringify(result, null, 2);
                }
                await ryn.reply({ text: `\`\`\`\n${message}\n\`\`\``, parse_mode: 'Markdown' }, m);
            } catch (error) {
                await ryn.reply({ text: `\`${error.message}\``, parse_mode: 'Markdown' }, m);
            }
        }
        
        if (m.text) {
            console.log('\x1b[30m--------------------\x1b[0m');
            console.log(chalk.bgHex("#e74c3c").bold(` ${botName} New Message!! `));
            console.log(
                `   - Date: ${new Date().toLocaleString('id-ID')} WIB \n` +
                `   - Message: ${m.text} \n` +
                `   - Sender Name: ${m.from.first_name} \n` +
                `   - Sender UserName: ${m.from.username} \n` +
                `   - ID: ${m.from.id}`
            );
            if (chatType === 'group' || chatType === 'supergroup') {
                console.log(
                    `   - Group: ${m.chat.title} \n` +
                    `   - GroupID: ${m.chat.id}`
                );
            }
            console.log();
        }
    })
    
    // Main
    
    ryn.onText(/(?:\/|\.)(\w+)/, async (m, match) => {
        try {
            const chatId = m.chat.id;
            const userId = m.from.id;
            const chatType = m.chat.type;
            let command = match[1];
            const text = m.text.trim().slice(command.length + 2).trim();
            const userName = m.from.username || m.from.first_name || 'Unknown';
            const userTag = userName.startsWith('@') ? userName : `@${userName}`;
            
            const scraper = await scrape.list()
            
            if (command) {
                await ryn.sendChatAction(chatId, 'typing');
            }
            
            // Plugin Handler
            
            const gtwlaaa = {
                ryn,
                text,
                command,
                fetchJson,
                chatId,
                userId,
                chatType,
                pickRandom,
                plugins,
                scraper
            }
            for (const plugin of plugins) {
                try {
                    if (typeof plugin.before === "function") {
                        if (plugin.before(m, gtwlaaa))
                        continue;
                    }
                    if (plugin.command.includes(command)) {
                        await ryn.sendChatAction(chatId, 'typing');
                        if (plugin?.settings?.owner && !m.isOwner) {
                            return ryn.reply(mess.owner, m);
                        }
                        if (plugin?.settings?.group && !m.isGroup) {
                            return ryn.reply(mess.group, m);
                        }
                        if (plugin?.settings?.private && !m.isPrivate) {
                            return ryn.reply(mess.private, m);
                        }
                        if (typeof plugin === "function") {
                            await plugin(m, gtwlaaa);
                        } else if (plugin.run) {
                            await plugin.run(m, gtwlaaa);
                        }
                        handled = true
                        break;
                    }
                } catch (error) {
                    console.error(`Error executing plugin ${plugin.filePath}:`, error)
                }
            }
            handleCases(m, gtwlaaa)
        } catch (err) {
            console.log(err)
    	    ryn.reply({ text: `${err}`, parse_mode: 'Markdown' }, m)
    	}
    });
    
    // Button Feature Func
    
    ryn.on('callback_query', async (callbackQuery) => {
        const { data, message: m } = callbackQuery;
        try {
            const parsedData = JSON.parse(data);
            const scraper = await scrape.list()
            
            let gtwww = {
                ryn,
                text: parsedData.data || '',
                command: parsedData.feature,
                fetchJson,
                pickRandom,
                chatId: m.chat.id,
                userId: m.from.id,
                plugins,
                scraper
            }
            if (parsedData.feature) {
                for (const plugin of plugins) {
                    try {
                        if (plugin?.command?.includes(parsedData.feature)) {
                            if (typeof plugin === "function") {
                                await plugin(m, gtwww);
                            } else if (plugin.run) {
                                await plugin.run(m, gtwww);
                            }
                            await ryn.answerCallbackQuery(callbackQuery.id);
                            handled = true
                            break;
                        }
                    } catch (error) {
                        console.error(`Error executing plugin ${plugin.filePath}:`, error)
                    }
                }
                handleCases(m, gtwww)
                await ryn.answerCallbackQuery(callbackQuery.id);
            }
        } catch (err) {
            console.log(err)
    	    ryn.reply({ text: `${err}`, parse_mode: 'Markdown' }, m)
    	}
    });
}