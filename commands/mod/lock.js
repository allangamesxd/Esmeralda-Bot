const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "lock",
    aliases: ["trancar", "channellock", "lockchannel"],

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;

        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply({ embeds: [new MessageEmbed().setColor("RED").setDescription(`:x: ${message.author} você precisa da permissão \`GERENCIAR CANAIS\` para trancar esse canal!`)] });
        if (!message.guild.members.cache.get(client.user.id).permissions.has("MANAGE_CHANNELS")) return message.reply({ embeds: [new MessageEmbed().setColor("RED").setDescription(`:x: ${message.author} eu preciso da permissão \`GERENCIAR CANAIS\` para trancar esse canal!`)] });
        
        message.reply(`:white_check_mark: O canal ${canal} foi trancando! use \`e-unlock\` se quiser destrancar`);
        canal.permissionOverwrites.edit(message.guild.id, {
            SEND_MESSAGES: false
        })
    }
}
