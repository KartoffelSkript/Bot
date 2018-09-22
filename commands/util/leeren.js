module.exports.run = (msg, args, client) => {
    // DB abfrage wie hoch das perm level ist
    if(!args[1]) return msg.channel.send("Anzahl angeben!");
    if(!msg.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) return msg.channel.send("Keine Berechtigung."); 
    msg.delete();
    msg.channel.bulkDelete(args[1]).then(() => {
        msg.channel.send(`${args[1]} Nachrichten gelöscht!`).then(msg => msg.delete(5000));
    })
}

module.exports.info = {
    beschreibung: "Lösche Nachrichten!",
    level: 5,
    enabled: true
}