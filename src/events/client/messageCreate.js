const chalk = require("chalk");
module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot || !message.guild) return;

    if(message.content.toLowerCase() === 'example') {
      message.reply('This is how you reply to a message interaction');
    }
  },
};
