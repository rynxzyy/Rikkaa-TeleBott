module.exports = {
    command: ['gitclone'],
    desc: 'Download repo github',
    category: ['tools'],
    async run(m, { ryn, text }) {
        if (!text) return ryn.reply({ text: 'Where is the link?' }, m)
		if (!text.includes('https://github.com')) return ryn.reply({ text: 'Invalid url-!' }, m)
        ryn.reply({ text: mess.wait }, m)
		let [, user, repo] = text.match(/(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i) || []
		try {
			ryn.downloadAndSend({ document: `https://api.github.com/repos/${user}/${repo}/zipball`, fileName: `${repo}.zip`, caption: mess.done }, m)
		} catch (e) {
			ryn.reply({ text: mess.error }, m)
		}
    }
}