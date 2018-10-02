const main = require('../../main');
// FUNKTIONIERT ABSOLUT ÜBERHAUPT NICHT
module.exports.run = (msg, args, client) => {

    function uptime() {
        let t = (Date.now() - main.startUpTime()) / 1000
        let d = Math.floor(t / (24 * 3600))
        let h = Math.floor(t % (24 * 3600) / 3600)
        let m = Math.floor(t % (24 * 3600) % 3600 / 60)
        let s = Math.floor(t % (24 * 3600) % 3600 % 60)
        return `${d} days, ${h} hours, ${m} mins, ${s} secs`
    }
    const embed = {
        "title": "Uptime:",
        "description": uptime(),
        "color": 1144292
      };
      msg.channel.send({ embed });
}

module.exports.info = {
    beschreibung: "Zeigt die Betriebszeit des Bots an!",
    level: 1,
    enabled: true
}