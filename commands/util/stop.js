module.exports.run = (msg) => {
    //funktioniert nicht
    if (!whitelist.includes(msg.author.id)) {
        return msg.channel.send(':no_entry_sign: Du hast leider keine Berechtigung für diesen Befehl.')
    }
    msg.channel.send("Bot wird gestoppt!");
    throw new Error("Bot offline!");
}

module.exports.info = {
    beschreibung: "Stoppt den Bot!",
    level: 99999,
    enabled: true
}