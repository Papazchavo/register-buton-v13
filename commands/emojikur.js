const Discord = require("discord.js");
const db = require("croxydb")
const config = require("../config.json");

module.exports = {
	name: 'emojikur',
	description: 'Emojileri kurarım..',
	aliases: ['emoji'],
	usage: 'emojikur',
    cooldown: 0,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */
	execute(message, args, client) {
if(!message.author.id === config.owner){
    message.reply(`Bu komutu sadece sahibim kullanabilir.`)
    return;
}




const emojis = [
{ name: "ates", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439806018879488/ates.gif" },
{ name: "tacc", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439808544243762/tacc.gif" },
{ name: "sonsuzkalp", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439863346364436/sonsuzkalp.gif" },
{ name: "star", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439871505072178/star.gif" },
{ name: "red", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439875170500629/red.gif" },
{ name: "green", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439878664486913/green.gif" },
{ name: "coin", url: "https://cdn.discordapp.com/attachments/827439712834158622/861702995371884634/coin.gif" },
 { name: 'developer', url: 'https://cdn.discordapp.com/emojis/853642013332865035.gif?v=1' },
 { name: 'loading', url: 'https://cdn.discordapp.com/emojis/857935194203226118.gif?v=1' },
 { name: 'arrow', url: 'https://cdn.discordapp.com/emojis/821298641863442442.gif?v=1' },
 { name: 'crown', url: 'https://cdn.discordapp.com/emojis/876942324909871114.gif?v=1' },
 { name: 'mark', url: 'https://cdn.discordapp.com/emojis/876153262796079115.gif?v=1' },
 { name: 'mark2', url: 'https://cdn.discordapp.com/emojis/853641429146140684.png?v=1' },
 { name: 'cross2', url: 'https://cdn.discordapp.com/emojis/853641452227264522.png?v=1' },
 { name: 'success', url: 'https://cdn.discordapp.com/emojis/793774156067373066.gif?v=1' },
 { name: 'web', url: 'https://cdn.discordapp.com/emojis/825429354707288065.png?v=1' },
];



emojis.forEach(async (x) => {
if (message.guild.emojis.cache.find((e) => x.name === e.name)) return message.channel.send(`Emoji zaten kurulmuş veri tabanında güncelledim! (${message.guild.emojis.cache.find((e) => x.name === e.name)})`), db.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());

const emoji = await message.guild.emojis.create(x.url, x.name);
await db.set(x.name, emoji.toString());
message.channel.send(`\`${x.name}\` isimli emoji oluşturuldu! (${emoji})`);
});
}
};