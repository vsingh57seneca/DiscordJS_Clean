const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Slap someone!')
        .addUserOption(options => 
                options.setName('slapee')
                    .setDescription('choose your victim')
                    .setRequired(true)),
    async execute(interaction, client) {
        await interaction.deferReply()
        client.emit('onSlap', interaction, client);
    }
}