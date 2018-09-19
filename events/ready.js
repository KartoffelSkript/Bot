module.exports = (client) => {
    console.log(`${client.user.username} ist online!`)
    client.user.setPresence({status: "online", game:{name: "mit Kartoffeln"}})
}