const whitelist = require('../../config').eval_whitelist;

module.exports.run = (msg, args, client) => {
    if (!whitelist.includes(msg.author.id)) {
        return msg.channel.send(':no_entry_sign: Du hast leider keine Berechtigung für diesen Befehl.')
    }
    befehl = args.join(' ');
    if (befehl.includes('token')) {
        return msg.channel.send(':no_entry_sign: Bitte versuche nicht unserer Zeichen abzufragen.')
    }
    try {
        let ergebniss = eval(befehl)
        msg.channel.send('Ausgeführt! Ergebnis: ' + ergebniss)
    } catch(e) {
        msg.channel.send('Es ist ein Fehler aufgetreten: ' + e.message)
    }
    
}

module.exports.info = {
    beschreibung: "Ausführen",
    level: 999,
    enabled: true
}