const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const chalk = require('chalk');

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, TEST_SERVER, CORD_SERVER } = process.env;

module.exports = (client) => {
    client.handleCommands = async() => {
        const commandFolders = fs.readdirSync('./src/commands');
        for(const folder of commandFolders)
        {
            const commandFiles = fs
            .readdirSync(`./src/commands/${folder}`)
            .filter((file) => file.endsWith(".js"))
        const { commands, commandArray } = client;
        for(const file of commandFiles) {
            const command = require(`../../commands/${folder}/${file}`);
            commands.set(command.data.name, command);
            commandArray.push(command.data.toJSON());
            console.log(chalk.blue(`Command: `) + chalk.yellow(`${command.data.name} `) + chalk.green(`has been passed through the handler`));
        }
    }


    const rest = new REST({ version: 9 }).setToken(DISCORD_TOKEN);
    try {

        console.log("\nStarted refreshing applications (/) commands.");

            await rest.put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID, TEST_SERVER), {
                body: client.commandArray,
            }).then(() => {
                console.log(chalk.green(`Successfully reloaded application (/) commands on ${TEST_SERVER}.`));
            }).catch((error) => {
                console.log(error)
            });

            await rest.put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID, CORD_SERVER), {
                body: client.commandArray,
            }).then(() => {
                console.log(chalk.green(`Successfully reloaded application (/) commands on ${CORD_SERVER}.`));
            }).catch((error) => {
                console.log(error)
            });

    } catch(error) {
        console.error(error);
    }
    };
};