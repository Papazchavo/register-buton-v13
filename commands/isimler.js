const Discord = require("discord.js");
const db = require("croxydb");
const ayarlar = require("../config.json");
const moment = require("moment");
moment.locale("tr");
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
	name: 'isimler',
	description: 'isimleri gör.',
	aliases: ['isim-list','isimliste'],
	usage: 'isimler @user',
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */
	execute(message, args, client) {
        var member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author
        const cross = db.fetch(`cross2`)
    const mark = db.fetch(`mark2`)
    const warn = db.fetch(`web`)
        ////
        const row = new MessageActionRow()
        .addComponents(
                new MessageButton()
                .setCustomId('ONAY')
                .setLabel('Onayla')
                .setStyle('PRIMARY'),
                new MessageButton()
                .setCustomId('CANCEL')
                .setLabel('İptal')
                .setStyle('DANGER'),
                );
        ////  


    ////////////////////////////////////////////////////////////////
    if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(ayarlar.yetkili)){
        message.channel.send(`${cross} ${message.author} İşlemi gerçekleştirmek için gerekli yetkiye sahip değilsin!`)
        message.react(cross2)
        return
      }
    ////////////////////////////////////////////////////////////////
    if(args[0] === "sıfırla"){
        var uye = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
        if(!uye){
            message.reply("Bir üye belirtmelisin.")
        }
        if(!message.member.permissions.has("ADMINISTRATOR")){
            message.channel.send(`${cross} ${message.author} İşlemi gerçekleştirmek için gerekli yetkiye sahip değilsin!`)
            message.react(cross2)
            return
          }
        message.channel.send({content: `${uye} kullanıcısının isim geçmisini sıfırlama işlemini onaylıyormusunuz!`, components: [row]})
        
        const filter = i => i.user.id === message.author.id


    const collector = message.channel.createMessageComponentCollector({ filter, time: 50000 });

      collector.on("collect", async i => {

        
if(i.customId === "ONAY") {
    db.delete(`isimler_${uye.id}`)
    await i.deferUpdate();
i.editReply({ components: [], content: `${mark} ${uye} kullanıcısının isim geçmişi başarıyla temizlendi!`})




}
if(i.customId === "CANCEL") {
    await i.deferUpdate();
i.editReply({ components: [], content: `${cross} İşlem iptal edildi!`})




}
})
return
    }
    const isimler = db.get(`isimler_${member.id}`) 
    if(!isimler){
        message.channel.send(`${warn} ${member} Kullanıcının isim geçmişi bulunamadı.`)
        return;
    }
    message.channel.send(`${member} Kullanıcısını isim listesi: \n${isimler.map((data, n) => `**${n + 1}.** ${data}`).join("\n")}`)
	},
};