const axios = require('axios');

function convertt(timestamp) {
    const date = new Date(timestamp);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${dd}-${mm}-${yyyy}`;
}

class pixiv {
    search = async function search(q, r18) {
        try {
            const { data } = await axios.get(`https://api.lolicon.app/setu/v2?r18=${r18 ? 1 : 0}&num=15&excludeAi=true&size=regular&keyword=${q}`)
            const array = [];
            data.data.map(res => {
                array.push({
                    caption: res.title,
                    author: res.author,
                    tags: res.tags.slice(0, 4).join(', '),
                    type: res.aiType === 2 ? 'AI Generated' : 'Illustrations',
                    uploadDate: convertt(res.uploadDate),
                    imageUrl: res.urls.regular
                });
            });
            return array;
        } catch (error) {
            return error.message;
        };
    }
}

module.exports = new pixiv()