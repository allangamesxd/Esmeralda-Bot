const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "unmute",
  aliases: ["removemute", "desmutar"],

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
 run: async(client, message, args) => {
   const user = message.mentions.members.first() ||message.guild.cache.get(message.mentions.repliedUser.id) || message.guild.members.cache.find(user => user.id === args[0]);

   if(!user) return message.reply(`:x: ${message.author} não foi possível encontrar o usuário \`${args.join(" ") || "Null"}\``)
     
     if(!message.member.permissions.has("MANAGE_SERVER")) return message.reply(`:x: ${message.author} Não é possível retirar o silenciamento de ${user} porque você precisa da permissão \`GERENCIAR SERVIDOR\``);

   if(!message.guild.members.cache.get(client.user.id).permissions.has("MANAGE_ROLES")) {
     message.reply(`:x: ${message.author} Não é possivel retirar o silenciamento de ${user} porque eu preciso da permissão \`GERENCIAR CARGOS\` `)
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
       
     user.roles.remove(GetNewMutedRole);
     message.reply({embeds: [
       new MessageEmbed()
       .setTitle(`🔈 Silenciamento retirado!`)
       .setDescription(`> usuário que perdeu o silenciamento: ${user} \n\n > Usuario que retirou o silenciamento: ${message.author}`)
       .setColor("WHITE")
     ]});
     
   } else {
     if(!user.roles.cache.has(MutedRole.id)) return message.reply(`:x: ${message.author} ${user} já está sem silenciamento!`);
     
     user.roles.remove(MutedRole)
     message.reply({embeds: [
       new MessageEmbed()
       .setTitle(`🔈 Silenciamento retirado!`)
       .setDescription(`> usuário que perdeu o silenciamento: ${user} \n\n > Usuario que retirou o silenciamento: ${message.author}`)
       .setColor("WHITE")
     ]});
   }
 }
}
