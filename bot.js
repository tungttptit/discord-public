require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

// Lấy token và channel ID từ .env
const TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});


const { Lunar } = require("lunar-javascript");

// Hàm kiểm tra ngày âm lịch
function getLunarDay() {
    const today = new Date();
    const lunar = Lunar.fromDate(today);
    return lunar.getDay(); // Trả về ngày âm lịch
}


// Hàm kiểm tra và gửi tin nhắn
async function checkAndNotify() {
    const channel = await client.channels.fetch(CHANNEL_ID);
    
    let lastNotifiedDay = null; // Lưu ngày đã gửi tin nhắn để tránh gửi trùng

    setInterval(async () => {
        const now = new Date();
        const lunarDay = getLunarDay();

        // Nếu hôm nay là ngày 1 hoặc 15 âm lịch và chưa gửi tin nhắn hôm nay
        if ((lunarDay === 1 || lunarDay === 15) && lastNotifiedDay !== lunarDay) {
            let message = (lunarDay === 1) 
                ? "Hôm nay là mùng "+lunarDay+" ! Tịnh tâm nha anh em 🙏" 
                : "Hôm nay là ngày "+lunarDay+" âm lịch! Tịnh tâm nha anh em 🏮";

            await channel.send(message);
            lastNotifiedDay = lunarDay; // Đánh dấu đã gửi tin nhắn hôm nay
        }
    }, 60 * 1000); // Kiểm tra mỗi phút
}

client.once("ready", async () => {
    console.log(`Bot đã đăng nhập thành công với tên ${client.user.tag}`);
    checkAndNotify();
});

client.login(TOKEN);

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Tạo route để UptimeRobot có thể ping
app.get("/", (req, res) => {
    res.send("Bot is running!");
});

// Chạy web server
app.listen(PORT, () => {
    console.log(`Web server đang chạy tại http://localhost:${PORT}`);
});

