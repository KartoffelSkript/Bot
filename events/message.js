module.exports = async (client, msg) => {
    if(msg.content == `<@${client.user.id}>`){
        msg.channel.send(client.emojis.get('491271120595582978') + " ")
    }

    if(msg.content.startsWith(client.prefix)){
        let invoke = msg.content.substr(client.prefix.length).split(" ")[0].toLowerCase()
        let args = msg.content.substr(client.prefix.length + invoke.length).split(" ")
        if(client.commands.get(invoke)) {
            if(client.command.get(invoke).info.enabled != true) return;
            let level = /*await DB.level und so ein schitt*/ 999
            if(client.command.get(invoke).info.level > level) return;
            client.commands.get(invoke).run(msg, args, client);
        }
    }
}