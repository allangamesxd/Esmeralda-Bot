// Express
const express = require("express");
const app = express();

app.get('/', (request, response) => {
    response.sendStatus(200);
});

app.listen(process.env.PORT);

// Livrarias e Variáveis 
const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

// Ligando a esmeralda e configurações da handler
const client = new Discord.Client({ intents: 131071, shards: "auto" });
client.login(process.env["Token"]);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdirSync(`./comandos`).forEach(local => {
    const comandos = fs.readdirSync(`./comandos/${local}`).filter(arquivo => arquivo.endsWith('.js'));

    for (let file of comandos) {
        let puxar = require(`./comandos/${local}/${file}`);

        if (puxar.name) {
            client.commands.set(puxar.name, puxar)
        };
        if (puxar.aliases && Array.isArray(puxar.aliases))
            puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
    }
});

// Leitor de mensagens
client.on("messageCreate", async (message) => {
    if (message.channel.type === "DM") return;
    if (message.author.bot) return;

    if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) return message.reply(`:wave: Olá ${message.author}! \n:label: Meu prefixo é \`e-\`! \n❓ Digite \`e-help\` ou \`e-ajuda\` para ver meus comandos \n\n :flag_us: if you don't speak portuguese you can use my slash commands they are 100% english.`);

    if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;

  if(id == "779695926855204865" || id == "822532606074683423") return message.reply(`:x: Infelizmente, você está em minha blacklist.`);
  
if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    try {
        command.run(client, message, args);
      console.log(`${message.guild}\\${message.author.tag}\\${message.content.slice(config.prefix.length).replace(`${args.join(" ")}`, ``).replace(" ", "")}\\args: ${args.join(" ")}`);
    } catch (e) {
        console.error(`${message.guild}\\${message.author.tag}\\${message.content.slice(config.prefix.length).replace(`${args.join(" ")}`, ``).replace(" ", "")}: ${e}`);
    }
  });

// Eventos da esmeralda 
client.on("ready", () => { // quando ela ficar online...
    const c = require("colors");

    console.log(c.green(`${client.user.tag} Online!`));
    console.log(c.yellow(`${client.users.cache.size} usuários.`));
    console.log(c.grey(`${client.guilds.cache.size} servidores.`));

    client.user.setActivity({ name: `prefixo: ${config.prefix} | ${client.guilds.cache.size} Servidores`, type: "PLAYING" })
    client.user.setStatus("online");
});
      })
