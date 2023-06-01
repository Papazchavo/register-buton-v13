const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS,Discord.Intents.FLAGS.GUILD_MEMBERS,Discord.Intents.FLAGS.GUILD_BANS,Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,Discord.Intents.FLAGS.GUILD_INTEGRATIONS,Discord.Intents.FLAGS.GUILD_WEBHOOKS,Discord.Intents.FLAGS.GUILD_INVITES,Discord.Intents.FLAGS.GUILD_VOICE_STATES,Discord.Intents.FLAGS.GUILD_PRESENCES,Discord.Intents.FLAGS.GUILD_MESSAGES,Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,Discord.Intents.FLAGS.DIRECT_MESSAGES,Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING] });
const fs = require("fs");
const db = require("croxydb")
const moment = require("moment");
const config = require("./config.json");
const { REST } = require("@discordjs/rest")
const { Route } = require("discord-api-types/v9")

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();




/*              COMMAND FILES              */

const commander = fs.readdirSync('./commands').filter(files => files.endsWith('.js'));
for (const files of commander) {
	const command = require(`./commands/${files}`);
    client.commands.set(command.name, command);
    const date = new Date()
    console.log("["+ moment(date).format("DD/MM/YYYY HH:mm") + "]: Command named " + command.name + " is loaded")
}

/*              COMMAND FILES              */

/*               EVENT FILES               */

const requestEvent = (event) => require(`./events/${event}`)
client.on('messageCreate', (messageCreate) => requestEvent('message')(messageCreate,client));

/*               EVENT FILES               */

client.on("ready", async () => {

    client.user.setPresence({ activities: [{ name: config.activities, type: "LISTENING" }] });
    client.user.setStatus("online")
    console.log('Botumuz hazır..')

})
client.on('guildMemberAdd', (member, guild) => {
    const moment = require("moment");
  moment.locale("tr");
  require("moment-duration-format");
    const ates = db.fetch(`ates`)
    const tac = db.fetch(`tacc`)
    const kanal = config.welcome
    const kanal1 = client.channels.cache.get(kanal)
    var kurulus = (Date.now() - member.user.createdTimestamp);
      var zaman = moment.duration(kurulus).format("Y [yıl], M [ay]");
      var zaman2 = moment.duration(kurulus).format("DD [Gün], HH [saat], mm [dakika], ss [saniye]");
      const date = moment(member.user.createdAt)
      const startedAt = Date.parse(date);
      var msecs = Math.abs(new Date() - startedAt);
      const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
      msecs -= years * 1000 * 60 * 60 * 24 * 365;
      const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
      msecs -= months * 1000 * 60 * 60 * 24 * 30;
      const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
      msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
      const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
      msecs -= days * 1000 * 60 * 60 * 24;
      const hours = Math.floor(msecs / (1000 * 60 * 60));
      msecs -= hours * 1000 * 60 * 60;
      const mins = Math.floor((msecs / (1000 * 60)));
      msecs -= mins * 1000 * 60;
      const secs = Math.floor(msecs / 1000);
      msecs -= secs * 1000;
      var string = "";
      if (years > 0) string += `${years} yıl ${months} ay`
      else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks + " hafta" : ""}`
      else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days + " gün" : ""}`
      else if (days > 0) string += `${days} gün ${hours > 0 ? hours + " saat" : ""}`
      else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins + " dakika" : ""}`
      else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs + " saniye" : ""}`
      else if (secs > 0) string += `${secs} saniye`
      string = string.trim();
      const endAt = member.user.createdAt
      const gün = moment(new Date(endAt).toISOString()).format('DD')
      const ay = moment(new Date(endAt).toISOString()).format('MM').replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
      const yıl = moment(new Date(endAt).toISOString()).format('YYYY')
      const saat = moment(new Date(endAt).toISOString()).format('HH:mm')
      const kuruluş = `${gün} ${ay} ${yıl} ${saat}`;
      const web = db.fetch(`web`)
      const crown = db.fetch(`crown`)
      const star = db.fetch(`star`)
      const kalp = db.fetch(`sonsuzkalp`)
      const taglı = db.fetch(`taglıalım`)
      if (kurulus > 604800000) {
  
        if(taglı === '1'){
          kanal1.send(`  ${tac} **${member.guild.name}** Sunucumuza hoşgeldin ${member}! 
  
    ${web} Hesabın **${kuruluş}**  tarihinde (**${zaman} önce**) oluşturulmuş!
  
    ${crown} Şuanda taglı alımdayız kayıt olmak için tagımızı(**${config.tag}**) alman gerek!
  
    ${star} Kurallarımızı (<#${config.rules}>) okumalısın, sunucu içindeki ceza-i işlemlerin kurallara göre uygulanacak.  
    
    ${ates} Kayıt olmak için solda bulunan **V.Confirmed** odalarına giriş yapıp ses teyit vermelisin.
  
    ${kalp} Seninle birlikte **${member.guild.memberCount}** kişiye ulaştık! Yetkililerimiz (<@&${config.yetkili}>) seninle ilgilenecektir. **İyi eğlenceler!**
    `)
        } else {
    kanal1.send(`  ${tac} **${member.guild.name}** Sunucumuza hoşgeldin ${member}! 
  
    ${web} Hesabın **${kuruluş}**  tarihinde (**${zaman} önce**) oluşturulmuş!
  
    ${crown} Tagımızı (**${config.tag}**) alarak bizlere destek olabilirsin!
  
    ${star} Kurallarımızı (<#${config.rules}>) okumalısın, sunucu içindeki ceza-i işlemlerin kurallara göre uygulanacak.  
    
    ${ates} Kayıt olmak için solda bulunan **V.Confirmed** odalarına giriş yapıp ses teyit vermelisin.
  
    ${kalp} Seninle birlikte **${member.guild.memberCount}** kişiye ulaştık! Yetkililerimiz (<@&${config.yetkili}>) seninle ilgilenecektir. **İyi eğlenceler!**
    `)}
  } else {
    const warn = db.fetch("warned")
    member.roles.add(config.süpheli)
    kanal1.send(`${warn} **${member}** sunucumuza katıldı fakat hesabı 2 haftadan erken oluşturulduğu için karantinaya alındı!`)
  
  }
  
  
  })
  
  client.on('message', async message => {
    if (message.content === 'fakekatıl') { 
      client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
        }
    });
    
  client.on('message', async message => {
    if (message.content === 'fakeçık') { 
      client.emit('guildMemberRemove', message.member || await message.guild.fetchMember(message.author));
        }
    });


client.login(config.token)