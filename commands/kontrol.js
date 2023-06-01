const Discord = require("discord.js");
const db = require("croxydb");
const ayarlar = require("../config.json");
const moment = require("moment");
moment.locale("tr");
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
	name: 'kontrol',
	description: 'kontrol et.',
	aliases: ['tagkontrol'],
	usage: 'kontrol',
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */
	execute(message, args, client) {
        const cross = db.fetch("cross")
       const cross2 = db.fetch("cross2")
       const mark = db.fetch("mark")
       const crown = db.fetch("crown")
       ////////////////////////////////////////////////////
       if(!message.member.permissions.has("ADMINISTRATOR")  ){
        message.channel.send(`${cross} ${message.author} İşlemi gerçekleştirmek için gerekli yetkiye sahip değilsin!`)
        message.react(cross2)
        return
      }
      //////////////////////////////////////////////////////
      const tag = ayarlar.tag
      const rol = ayarlar.family
      let taglilar = message.guild.members.cache.filter(s => s.user.username.includes(tag) && !s.roles.cache.has(rol))
      taglilar.forEach(async(member, index) => {
        setTimeout(async() => {
        if(member.user.bot) return
        await member.roles.add(rol)
        }, index * 1000)
        })
        message.reply(`${mark} Başarılı! **${taglilar.size}** kullanıcıya taglı rolü verilecek!`)
    },
};