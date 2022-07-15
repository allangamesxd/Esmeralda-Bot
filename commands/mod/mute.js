const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  aliases: ["givemute", "mutar", "silenciar"],

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
 run: async(client, message, args) => {
   const user = message.mentions.members.first() ||message.guild.cache.get(message.mentions.repliedUser.id) || message.guild.members.cache.find(user => user.id === args[0]);

   if(!user) return message.reply(`:x: ${message.author} não foi possível encontrar o usuário \`${args.join(" ") || "Null"}\``)
     
     if(!message.member.permissions.has("MANAGE_SERVER")) return message.reply(`:x: ${message.author} Não é possível silenciar ${user} porque você precisa da permissão \`GERENCIAR SERVIDOR\``);
   if(user.user.id == message.author.id) return message.reply(`:x: ${message.member} você não pode silenciar a si mesmo!`);

   if(user.user.id == client.user.id) return message.reply(`:x: ${message.author} eu não posso silenciar a mim mesma!`);

   if(user.permissions.has("ADMINISTRATOR")) return message.reply(`:x: ${message.author} não foi possível silenciar ${user} porque o usuário é um administrador.`)

   if(!message.guild.members.cache.get(client.user.id).permissions.has("MANAGE_ROLES")) {
     message.reply(`:x: ${message.author} Não é possivel silenciar ${user} porque eu preciso da permissão \`GERENCIAR CARGOS\` `)
   };

   if(message.guild.members.cache.get(client.user.id).roles.highest.position <= user.roles.highest.position) {
     message.reply(`:x: ${message.author} não é possível silenciar ${user} porque o cargo dele está em posição maior ou igual a minha. para não ter erros como este coloque meu cargo no topo da lista de cargos.`);
   };
   
  if(user.roles.highest.position >= message.member.roles.highest.position) return message.reply(`:x: ${message.member} você não pode silenciar ${user} porque a posição do cargo dele é maior ou igual a sua.`);
   
  let MutedRole = message.guild.roles.cache.find(role => role.name === `Silenciado`);
   if(!MutedRole) {
    let NewMutedRole = await message.guild.roles.create({
  data: {
   name: "Silenciado",
    permissions: {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false
    }
  }
    });

   const GetNewMutedRole = message.guild.roles.cache.find(role => role.name === `Silenciado`);

     if(user.roles.cache.has(GetNewMutedRole.id)) return message.reply(`:x: ${message.author} ${user} já está silenciado!`)
       
     user.roles.add(GetNewMutedRole);
     message.reply({embeds: [
       new MessageEmbed()
       .setTitle(`🔈 Usuário Silenciado!`)
       .setDescription(`> Usuário silenciado: ${user} \n\n > Usuario que silenciou: ${message.author}`)
       .setColor("WHITE")
     ]});
     
   } else {
     if(user.roles.cache.has(MutedRole.id)) return message.reply(`:x: ${message.author} ${user} já está silenciado!`);
     
     user.roles.add(MutedRole)
     message.reply({embeds: [
       new MessageEmbed()
       .setTitle(`🔈 Usuário Silenciado!`)
       .setDescription(`> Usuário silenciado: ${user} \n\n > Usuario que silenciou: ${message.author}`)
       .setColor("WHITE")
     ]});
   }
 }
}
