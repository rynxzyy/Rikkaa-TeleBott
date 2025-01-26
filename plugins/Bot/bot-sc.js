const axios = require('axios');

let rynn = async (m, { ryn }) => {
    let data = await axios.get("https://api.github.com/repos/rynxzyy/Rikkaa-TeleBott").then((a) => a.data);
    let cap = 
`—
*</> Script Information ‼️*
- *Name*: ${data.name}
- *Owner*: ${data.owner.login}
- *Created*: ${ago(data.created_at)}
- *Last Update*: ${ago(data.updated_at)}
- *Link*: ${data.html_url}`;
    ryn.reply({ text: cap, parse_mode: 'Markdown' }, m)
}

rynn.command = ['sc']
rynn.desc = 'Sc info'
rynn.category = ['bot']

module.exports = rynn

function ago(time) {
    const date = new Date(time);
    const timestamp = date.getTime();
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(seconds / 86400);
    const months = Math.floor(seconds / 2592000);
    const years = Math.floor(seconds / 31536000);
    
    if (seconds < 60) {
      return seconds === 1 ? "1 second ago" : seconds + " seconds ago";
    } else if (minutes < 60) {
      return minutes === 1 ? "1 minute ago" : minutes + " minutes ago";
    } else if (hours < 24) {
      return hours === 1 ? "1 hour ago" : hours + " hours ago";
    } else if (days < 30) {
      return days === 1 ? "1 day ago" : days + " days ago";
    } else if (months < 12) {
      return months === 1 ? "1 month ago" : months + " months ago";
    } else {
      return years === 1 ? "1 year ago" : years + " years ago";
    }
}
