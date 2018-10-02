module.exports.run = (msg, args, client) => {
        msg.delete();
        msg.channel.send(args.join(" ") || "Kartoffeln");
}

module.exports.info = {
        beschreibung: "Sage etwas",
        level: 1,
        enabled: true
}