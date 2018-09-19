module.exports.run = (msg, args, client) => {
        let contents = []
        client.commands.forEach((e, k) => {
            contents.push([k, client.prefix + k])
        })
        console.log(client.commands)
        client.embed.uni(msg, "Hallo! Ich bin der Kartoffel-Mann!", "Ich bin der Offizielle Bot für die Kartoffelskript-Sprache!\nHier siehst Du eine Liste aller Kommandos, die ich beherrsche:", 
        contents,
         "0xffaa00")
}

async function getFiles(dir) {
    const subdirs = await fs.readdirSync(dir);
    const files = await Promise.all(subdirs.map(async (subdir) => {
      const res = resolve(dir, subdir);
      return (await fs.statSync(res)).isDirectory() ? getFiles(res) : res;
    }));
    return files.reduce((a, f) => a.concat(f), []);
}

module.exports.info = {
    beschreibung: "Hilfe!",
    level: 0,
    enabled: true
}