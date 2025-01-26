/*
 *  Your bot settings here
 */

global.botName = 'Rikkaa' // Bot Name
global.banner = './src/settings/banner.jpg' // Can use path, can also use link
global.token = 'YOUR_BOT_TOKEN' // Bot Token (Get it from BotFather)
global.ownerUsername = 'your_username' // Owner Username
global.ownerId = [1234567890] // Owner ID, can add more than 1

global.mess = {
    internalerr: 'Internal server error!',
	owner: 'Owner-only feature!',
	group: 'Use in a group!',
	private: 'Use in a private chat!',
	wait: 'Wait...',
	error: 'Oops, an error occurred',
	done: 'Done!'
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
