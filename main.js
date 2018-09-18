const Discord = require("discord.js");
const { resolve, basename } = require('path');
const fs = require('fs');
const config = require("./config.json")

class kartoffel extends Discord.Client {

    constructor(prefix, options={}) {
        super(options);
        this.prefix = prefix;
        this.embed = require("./embed")
        this.commands = new Map();
        load();
        this.login(config.token)
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

        if(client.commands.get(invoke)){
            client.commands.get(invoke)[invoke](msg, args, client)
        }
    }
});


async function getFiles(dir) {
    const subdirs = await fs.readdirSync(dir);
    const files = await Promise.all(subdirs.map(async (subdir) => {
      const res = resolve(dir, subdir);
      return (await fs.statSync(res)).isDirectory() ? getFiles(res) : res;
    }));
    return files.reduce((a, f) => a.concat(f), []);
}

async function load() {
    let commandList = await getFiles("commands")
    for (i = 0; i < commandList.length; i++) {
        let item = commandList[i];
        if (item.match(/\.js$/)) {
            delete require.cache[require.resolve(`${item}`)];
            client.commands.set(basename(item).slice(0, -3), require(`${item}`));
        }
    }
}  