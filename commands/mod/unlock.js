const { Client, Message } = require("discord.js");

module.exports = {
    name: "unlock",
    aliases: ["destrancar", "channelunlock", "unlockchannel"],

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns 
     */
    run: async (client, message, args) => {
        const { channel, guild, author, member, reply } = message;
        const Channel = message.mentions.channels.first || guild.channels.cache.get(args[0]) || channel;


        if (!member.permissions.has("MANAGE_CHANNELS")) return reply({ embeds: [new MessageEmbed().setColor("RED").setDescription(`:x: ${author} você precisa da permissão \`GERENCIAR CANAIS\` para trancar esse canal!`)] });
        if (!guild.members.cache.get(client.user.id).permissions.has("MANAGE_CHANNELS")) return reply({ embeds: [new MessageEmbed().setColor("RED").setDescription(`:x: ${author} eu preciso da permissão \`GERENCIAR CANAIS\` para trancar esse canal!`)] });
        if (!guild.roles.cache.get(`@everyone`).permissions.has("SEND_MESSAGES")) return reply({ embeds: [new MessageEmbed().setColor("RED").setDescription(`:x: ${author} esse canal já está trancado! se quiser destrancar use \`e-unlock\``)] });

        reply(`:white_check_mark: O canal ${Channel} foi destrancando! use \`e-lock\` para trancar novamente`);
        channel.permissionOverwrites.edit(message.guild.id, {
            SEND_MESSAGES: true
        });
    }
}
