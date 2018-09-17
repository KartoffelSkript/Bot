module.exports = {
    sage: function(msg, args, client){
        msg.delete()
        msg.channel.send(args.join(" ") || "Kartoffeln")
    }
}