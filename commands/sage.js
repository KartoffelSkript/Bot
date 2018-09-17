module.exports = (msg, args, client) => {
        msg.delete();
        msg.channel.send(args.join(" ") || "Kartoffeln");
}