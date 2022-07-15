const Discord = require("discord.js");

module.exports = {
    name: "say",
    aliases: ["dizer"],

    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     * @returns 
     */
    run: async (client, message, args) => {
        const getArgs = args.join(" ");
        const unixTS = new Date();
        const thisClient = message.guild.members.cache.get(client.user.id);

        if(!thisClient.permissions.has("MANAGE_MESSAGES")) return message.reply(`:x: ${message.author} eu presciso da permissão \`GERENCIAR MENSAGENS\` para executar esse comando!`);

        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`:x: Este comando requer que você tenha a permissão \`GERENCIAR MENSAGENS\`!`);

        if(!getArgs) return message.reply(`:x: | ${message.author} Escreva algo ao lado do comando para eu falar ex. \`e-say <texto>\``)

        message.delete();
        message.channel.send(`${getArgs} \n\n Mensagem por ${message.author} <t:${Math.floor(unixTS.getTime() / 1000)}:R> atrás`);
    }
}
