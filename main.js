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
        this.login(config.bot.token)
    }

}

const client = new kartoffel("k!")

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
    fs.readdir("./events/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            const event = require(`./events/${file}`);
            let eventName = file.split(".")[0];
            client.on(eventName, event.bind(null, client));
            delete require.cache[require.resolve(`./events/${file}`)];
    });
  });
    console.log(client.commands)
}  

