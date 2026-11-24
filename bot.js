require('dotenv').config();
const { Bot, InlineKeyboard } = require('grammy');

const BOT_NAME = 'NSE SUPPORT CENTRE RJ²⁶';
const BOT_USERNAME = '@nsesupportcentrebot';
const token = process.env.BOT_TOKEN;

if (!token) {
  console.error('ERROR: BOT_TOKEN nahi mila! .env ya Render Environment mein BOT_TOKEN set karo.');
  process.exit(1);
}

const bot = new Bot(token);

bot.command('start', async (ctx) => {
  const userName = ctx.from?.first_name || 'User';
  const menu = new InlineKeyboard()
    .text('📩 Support Request', 'support_info')
    .row()
    .text('📌 Bot Details', 'bot_details');

  await ctx.reply(
    `Namaste ${userName}! 👋\n\n*${BOT_NAME}* (${BOT_USERNAME}) mein aapka swagat hai.\nKripya neeche diye gaye option chunein:`,
    {
      parse_mode: 'Markdown',
      reply_markup: menu,
    }
  );
});

bot.callbackQuery('support_info', async (ctx) => {
  await ctx.answerCallbackQuery({ text: 'Support details bheji gayi' });
  await ctx.reply(
    `📩 *${BOT_NAME} Support*\nApna sawal ya message yahan likh kar bhejein, hamari team jald hi madad karegi.`,
    { parse_mode: 'Markdown' }
  );
});

bot.callbackQuery('bot_details', async (ctx) => {
  await ctx.answerCallbackQuery({ text: 'Bot active hai' });
  await ctx.reply(
    `🤖 *Bot Name:* ${BOT_NAME}\n🔗 *Username:* ${BOT_USERNAME}\n✅ *Status:* Online & Active`,
    { parse_mode: 'Markdown' }
  );
});

bot.on('message', async (ctx) => {
  await ctx.reply(
    `Aapka message *${BOT_NAME}* ko mil gaya hai. Menu ke liye /start bhejein.`,
    { parse_mode: 'Markdown' }
  );
});

bot.catch((err) => {
  console.error('Bot error:', err);
});

bot.start();
console.log(`${BOT_NAME} (${BOT_USERNAME}) chal raha hai...`);