const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const chalk = require('chalk');

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

    const clientId = `${process.env.clientId}`;

    const rest = new REST({ version: 9 }).setToken(process.env.token);
    try {

        console.log("\nStarted refreshing applications (/) commands.");

        const test_server = process.env.test_server;

            await rest.put(Routes.applicationGuildCommands(clientId, test_server), {
                body: client.commandArray,
            }).then(() => {
                console.log(chalk.green(`Successfully reloaded application (/) commands on ${test_server}.`));
            }).catch((error) => {
                console.log(error)
            });

    } catch(error) {
        console.error(error);
    }
    };
};