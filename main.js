const Discord = require("discord.js")
const {Client} = Discord


var client = new Client()
client.prefix = "k!"
client.embed = require("./embed.js")

client.commands = new Map()

client.commands.set("hilfe", require("./commands/hilfe.js"))
client.commands.set("sage", require("./commands/sage.js"))


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

        if(client.commands.get(invoke)){
            client.commands.get(invoke)[invoke](msg, args, client)
        }
    }
})

client.login("")