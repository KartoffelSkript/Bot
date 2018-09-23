const whitelist = require('../../config').eval_whitelist;

module.exports.run = (msg, args, client) => {
    if (!whitelist.includes(msg.author.id)) {
        return msg.channel.send(':no_entry_sign: Du hast leider keine Berechtigung für diesen Befehl.')
    }
    client.destroy();
    process.exit();
}

module.exports.info = {
    beschreibung: "Stoppt den Bot!",
    level: 999,
    enabled: true
}