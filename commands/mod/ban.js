const { Client, Message, MessageAttachment } = require("discord.js")
const ms = require("ms");

module.exports = {
    name: "ban",
    aliases: ["banuser", "banmember", "banir"],

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns
     */
    run: async(client, message, args) => {
        const usuário = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let tempo = args.join(" ").replace(`${usuário}`, "");
        let motivo = args.join(" ").replace(`${usuário}`, "").replace(`${tempo}`, "")
        const guildClient = message.guild.members.cache.get(client.user.id);
        if(!motivo) motivo = `Sem motivo definido`;

        if(!message.member.permissions.has("BAN_MEMBERS")) {
            message.reply(`:x: Você tem permissão para isso!`).catch(() => message.author.send(`:x: Você não tem permissão para isso!`))
        } else if(!guildClient.permissions.has("BAN_MEMBERS")) {
            message.reply(`:x: Eu preciso da permissão \`BANIR MEMBROS\` para banir esse usuário.`).catch(() => {message.author.send(`:x: Eu preciso da permissão \`BANIR MEMBROS\` para banir esse usuário.`)})
        }  else if(!usuário) {
            message.reply(`:x: Marque um usuário ao lado do comando. ex. \`e-ban <usuário>\``);
        } else if(usuário.permissions.has("ADMINISTRATOR")) {
            message.reply(`:x: Eu não posso banir um administrador!`).catch(() => message.author.send(`:x: Eu não posso banir um administrador!`))
        } else if(usuário === message.guild.ownerId) {
            message.reply(`:x: Eu não posso banir o dono do servidor!(${message.guild.ownerId})`).catch(() => message.author.send(`:x: Eu não posso banir o dono do servidor!(${message.guild.ownerId})`))
        } else if(usuário.id === message.author.id) {
            message.reply(`:x: Você não pode banir a si mesmo!`);
        } else if(usuário.id === client.user.id) {
            message.reply(`:x: Eu não posso bani a mim mesma`)
        } else if(usuário && tempo) {
            try {
                usuário.ban({reason: motivo + " - Banido por "+message.member.nickname || message.author.username});

            message.reply(`Usuário banido! enquanto a esmeralda estiver online, o ban será temporário`).catch(() => {});

            setTimeout(() => {
                message.guild.members.unban(usuário, "tempban");
            }, tempo)
            } catch (e) {
                message.reply(`Não foi possivel efetuar o ban temporário. talvez o tempo que você definiu seja inválido ou aconteceu algo no sistema, erro do DJS: ${e}`)
            }
        } else {
            if(message.member.nickname === null) message.member.nickname = message.author.tag;
            usuário.ban({reason: motivo + " Banido por "+message.member.nickname});

            message.reply(`Usuário banido com o motivo \`${motivo}\`!`).catch(() => {})
        }
    }
}
