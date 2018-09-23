const Discord = require("discord.js");
const { resolve, basename } = require('path');
const fs = require('fs');
const config = require("./config.json")
const startTime = Date.now()

class kartoffel extends Discord.Client {

    constructor(prefix, options={}) {
        super(options);
        this.prefix = prefix;
        this.embed = require("./embed")
        this.commands = new Map();
        this.categories = new Map();
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
    let commandCateg = await fs.readdirSync("commands")
    for (i = 0; i < commandList.length; i++) {
        let item = commandList[i];
        commandCateg.forEach(categ => {
            if(!client.categories.get(categ)) client.categories.set(categ, categ)
        })
        if (item.match(/\.js$/)) {
            delete require.cache[require.resolve(`${item}`)];
            var commandcategory
            commandCateg.forEach(categ => {
                if(item.includes(categ)) commandcategory = categ
            })
            client.commands.set(basename(item).slice(0, -3), [require(`${item}`), commandcategory]);
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

exports.startUpTime = function() {
    return this.startTime
}
