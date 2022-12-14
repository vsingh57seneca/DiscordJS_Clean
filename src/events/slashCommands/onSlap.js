const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const chalk = require('chalk');
const fetch = require('node-fetch');

module.exports = {
    name:   'onSlap',
    async execute(interaction, client) {
        console.log(chalk.yellow(`Executing event '${this.name}'`));
        const file = new AttachmentBuilder('./src/images/slap/image.png');

        const results = await fetch(`https://tenor.googleapis.com/v2/search?q=slapping&media_filter=gif&ar_range=standard&random=true&key=${process.env.tenor_key}&client_key=my_test_app&limit=50`);
        const gifs = await results.json();
        const url = gifs['results'][0].media_formats.gif.url

        const embed = new EmbedBuilder() 
            .setTitle('has just slapped')
            .setDescription(interaction.options.data[0].user.tag)
            .setColor(0x18e1ee)
            .setImage(url)
            //.setThumbnail("attachment://image.png")
            .setThumbnail(interaction.options.data[0].user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setAuthor({
                iconURL: interaction.user.displayAvatarURL(),
                name: interaction.user.tag
            })
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: client.user.tag
            })
        try {
            await interaction.followUp({
                embeds: [embed],
                //files: [file]                
            },
            console.log(chalk.green(`Event '${this.name}' executed successfully`)));
        } catch (error) {
            console.error(chalk.red(`ERROR: [${error}]`));
        }
    }
}