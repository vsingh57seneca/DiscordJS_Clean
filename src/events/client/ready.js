const chalk = require("chalk");
const fs = require('fs');

module.exports = {
  name: "ready",
  once: "true",
  async execute(interaction, client) {
    const bot = client.user.tag;

    console.log(
      chalk.green(`\nReady ` + chalk.blue(bot) + ` is logged in and online.`)
    );

  },
};

