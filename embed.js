const { RichEmbed } = require("discord.js");

module.exports = {
    uni: function(msg, title, desc, contents, color){
        var emb = new RichEmbed()
        .setTitle(title || "Default RichEmbed Title")
        .setDescription(desc || "Default RichEmbed Description")
        .setColor(color || "0xffffff")
    if(contents[0]){
        contents.forEach(c => {
            emb.addField(c[0], c[1])
        })
    }
    msg.channel.send("", emb)
    }
}