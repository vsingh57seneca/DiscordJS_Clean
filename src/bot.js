const dotenv = require('dotenv');
dotenv.config();

//Discord Bot 
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const { Guilds, GuildMessages, MessageContent, GuildVoiceStates, GuildMembers, } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent, GuildVoiceStates, GuildMembers] });
const chalk = require('chalk');

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.commandArray = [];

const functionFolder = fs.readdirSync('./src/functions');

for(const folder of functionFolder)
{
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();


client.login(token);
