module.exports = {
    hilfe: function(msg, args, client){
        let contents = []
        client.commands.forEach((e, k) => {
            contents.push([k, client.prefix + k])
        })
        console.log(client.commands)
        client.embed.uni(msg, "Hallo! Ich bin der Kartoffel-Mann!", "Ich bin der Offizielle Bot für die Kartoffelskript-Sprache!\nHier siehst Du eine Liste aller Kommandos, die ich beherrsche:", 
        contents,
         "0xffaa00")
    }
}