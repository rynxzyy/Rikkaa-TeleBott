const fs = require('fs');

let rynn = async (m, { ryn, plugins }) => {
    const groupedPlugins = plugins.reduce((groups, plugin) => {
        if (plugin.command && Array.isArray(plugin.command)) {
            const categories = Array.isArray(plugin.category) ? plugin.category : [plugin.category || 'other'];
            categories.forEach(category => {
                if (!groups[category]) groups[category] = [];
                groups[category].push(plugin);
            });
        }
        return groups;
    }, {});

    const fileContent = fs.readFileSync('./case.js', 'utf8');
    const categoryRegex = /\/\/ (.*?) —+([\s\S]*?)(?=\/\/|$)/g;
    const caseRegex = /case\s+['"`](.*?)['"`]\s*:/g; 
    let match;
    const categories = {};
    while ((match = categoryRegex.exec(fileContent)) !== null) {
        const category = match[1].trim();
        const blockContent = match[2];
        if (!categories[category]) categories[category] = [];
        let caseMatch;
        while ((caseMatch = caseRegex.exec(blockContent)) !== null) {
            categories[category].push(caseMatch[1].trim());
        }
        categories[category].sort((a, b) => a.localeCompare(b));
    }

    const combinedCategories = { ...groupedPlugins, ...categories };
    
    let menu = 
`*Hey, I'm ${botName.toLowerCase()} ‼️*
A virtual assistant ready to help anytime.
Here are the menus you can choose from 🌟
`;

    for (const [category, items] of Object.entries(combinedCategories)) {
        items.sort((a, b) => a.command ? a.command[0].localeCompare(b.command[0]) : a.localeCompare(b));
        menu += `\n\`[ ${category.capitalize()}-!! ]\``;
        items.forEach(item => {
            const command = item.command ? `- /${item.command[0]} ${item.desc ? '- ' + item.desc : ''}` : `- /${item}`;
            menu += `\n${command}`;
        });
        menu += '\n';
    }
    let buttons = [
        [
            { text: 'Author-!!', url: `https://t.me/${ownerUsername}` },
            { text: 'Help-??', callback_data: JSON.stringify({ feature: 'help' }) },
        ], [
            { text: 'Thx To-!!', callback_data: JSON.stringify({ feature: 'thxto' }) },
        ]
    ]
    await ryn.reply({ image: {url: banner}, caption: menu, parse_mode: 'Markdown' }, buttons, m);
}

rynn.command = ['menu', 'start']
rynn.desc = 'Displays the menu'
rynn.category = ['bot']

module.exports = rynn
