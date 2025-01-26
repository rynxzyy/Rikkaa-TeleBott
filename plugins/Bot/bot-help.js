let rynn = async (m, { ryn }) => {
    ryn.reply({ text: `Need help? just ask the author\n@${ownerUsername}` }, m)
}

rynn.command = ['help']
rynn.desc = 'Help info'
rynn.category = ['bot']

module.exports = rynn
