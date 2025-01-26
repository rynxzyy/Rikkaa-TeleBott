const axios = require('axios');

let ai = async (m, { ryn, text }) => {
    if (!text) {
        ryn.reply({ text: 'Silakan masukkan pertanyaan atau perintah untuk AI.' }, m);
        return;
    }

    try {
        const { data } = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama3-70b-8192",
                messages: [
                    { role: "system", content: "Nama Kamu Adalah Rikka." },
                    { role: "user", content: text }
                ],
                temperature: 1,
                max_tokens: 8192,
                top_p: 1,
                stop: null,
                stream: false
            },
            {
                headers: {
                    authority: "api.groq.com",
                    accept: "application/json",
                    "accept-encoding": "gzip, deflate, br, zstd",
                    "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
                    authorization: "Bearer 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",
                    "content-type": "application/json",
                    "groq-organization": "org_01j8am53bjeyf8nvm16tmwdee7",
                    origin: "https://console.groq.com",
                    referer: "https://console.groq.com/",
                    "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": '"Windows"',
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
                }
            }
        );

        const response = data.choices[0].message.content;
        ryn.reply({ text: response }, m);
    } catch (error) {
        console.error('Error occurred while fetching AI data:', error);
        ryn.reply({ text: 'Maaf, terjadi kesalahan saat memproses permintaan Anda.' }, m);
    }
};

ai.command = ['ai'];
ai.desc = 'Ai Chat';
ai.category = ['ai'];

module.exports = ai;
