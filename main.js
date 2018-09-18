const Discord = require("discord.js");
const fs = require("fs");
const config = require('./config')

class kartoffel extends Discord.Client {

    constructor(prefix) {
        super()
        this.prefix = prefix;
        this.embed = require("./embed")
        this.commands = new Map();
        this.laden();
    }

    laden() {
        let commandList = fs.readdirSync('./commands/');
        for (let i = 0; i < commandList.length; i++) {
            let item = commandList[i];
            if (item.match(/\.js$/)) {
                delete require.cache[require.resolve(`./commands/${item}`)];
                this.commands.set(item.slice(0, -3), require(`./commands/${item}`));
            }
        }
    }

}

const client = new kartoffel("k!")

client.on("ready", () => {
    console.log(`${client.user.username} ist online!`)
    client.user.setPresence({status: "online", game:{name: "mit Kartoffeln"}})
})

client.on("message", msg => {
    if(msg.content == `<@${client.user.id}>`){
        msg.channel.send(client.emojis.get('491271120595582978') + " ")
    }

    if(msg.content.startsWith(client.prefix)){
        let invoke = msg.content.substr(client.prefix.length).split(" ")[0].toLowerCase()
        let args = msg.content.substr(client.prefix.length + invoke.length).split(" ")

        if(client.commands.get(invoke)) {
            client.commands.get(invoke)(msg, args, client)
        }
    }
})

client.login(config.bot.token)