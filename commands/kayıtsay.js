const Discord = require("discord.js");
const db = require("croxydb");
const ayarlar = require("../config.json");
const moment = require("moment");
moment.locale("tr");
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
	name: 'kayıtsay',
	description: 'Botcuyu gör.',
	aliases: ['kayıt-sayı'],
	usage: 'kayıtsay',
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
    ////////////////////////////////////////////////////////////////
    if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(ayarlar.yetkili)){
        message.channel.send(`${cross} ${message.author} İşlemi gerçekleştirmek için gerekli yetkiye sahip değilsin!`)
        message.react(cross2)
        return
      }
    ////////////////////////////////////////////////////////////////
     ////
     const row = new MessageActionRow()
     .addComponents(
             new MessageButton()
             .setCustomId('e')
             .setLabel('♂ Erkekler')
             .setEmoji("945389255981674596")
             .setStyle('PRIMARY'),
             new MessageButton()
             .setCustomId('k')
             .setLabel('♀ Kızlar')
             .setStyle('DANGER')
             .setEmoji("945389255981674596"),
             );
             const x = new MessageActionRow()
     .addComponents(
             new MessageButton()
             .setCustomId('geri')
             .setLabel('↩️ Geri')
             .setStyle('PRIMARY'),

             );
             const b = new MessageActionRow()
     .addComponents(
             new MessageButton()
             .setCustomId('s')
             .setLabel('Sıfırla')
             .setEmoji("931674963667214346")
             .setStyle('SUCCESS'),

             );
     ////  
    if(!member){
        message.channel.send(`${cross} ${message.author}, Lütfen komutu uygun şekilde kullanın. \n**${ayarlar.prefix}kayıtsayı @Kardoxa/id**`)
     return
     }	
     if(args[0] === "sıfırla"){
        var uye = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;
        db.delete(`kayıtoplam_${uye.id}`)
        db.delete(`kayıte_${uye.id}`)
        db.delete(`kayıtk_${uye.id}`)
        message.channel.send(`${mark} ${uye} kullanıcısının kayıt sayıları başarıyla temizlendi!`)
        return
    }
    
    const erkek = db.fetch(`kayıte_${member.id}`) || `${cross}\` Veri bulunamadı\``
    const kadın = db.fetch(`kayıtk_${member.id}`) || `${cross} \`Veri bulunamadı\``
    const toplam = db.fetch(`kayıtoplam_${member.id}`) || `${cross} \`Veri bulunamadı\``
    message.channel.send({ content: `${member} Kullanıcısının kayıt bilgileri:
    
    Kayıt edilen erkek kullanıcı: **${erkek}**!
    Kayıt edilen kadın kullanıcı: **${kadın}**!
    Kayıt edilen toplam kullanıcı: **${toplam}**!
    
    `})
    message.reply({ content: `${member} Kullanıcısının kaydettiği erkek veya kız kullanıcıları görmek için alternatif butonları kullanabilirsin.`, components: [row,b]})
    const filter = i => i.user.id === message.author.id


    const collector = message.channel.createMessageComponentCollector({ filter, time: 50000 });

      collector.on("collect", async i => {
        const erkek = db.get(`kayıterkek_${member.id}`) 
        const kız = db.get(`kayıtkız_${member.id}`) 
if(i.customId === "e") {
  
    await i.deferUpdate();
    if(!erkek) return i.editReply({components: [x], content: `${member.toString()} kullanıcısına ait veri bulunamadı!`})
i.editReply({ components: [x], content: `${mark} ${member.toString()} kullanıcısının kaydettiği erkek kullanıcılar: \n${erkek.map((data, n) => `**${n + 1}.** \`${message.guild.members.cache.get(data).nickname} (${data})\``).join("\n")}`})





      }
      if(i.customId === "k") {
        await i.deferUpdate();
        if(!kız) return i.editReply({components: [x], content: `${member.toString()} kullanıcısına ait veri bulunamadı!`})
    i.editReply({ components: [x], content: `${mark} ${member.toString()} kullanıcısının kaydettiği kız kullanıcılar: \n${kız.map((data, n) => `**${n + 1}.** \`${message.guild.members.cache.get(data).nickname} (${data})\``).join("\n")}`})
    
    
    
    
    
          }
          if(i.customId === "geri") {
            await i.deferUpdate();
        i.editReply({content: `${member} Kullanıcısının kaydettiği erkek veya kız kullanıcıları görmek için alternatif butonları kullanabilirsin.`, components: [row, b]})
      
      }
      if(i.customId === "s") {
        await i.deferUpdate();
    i.editReply({content: `${member} Kullanıcısının bütün kayıt verileri sıfırlandı!.`, components: [x]})
    var uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
        db.delete(`kayıtoplam_${uye.id}`)
        db.delete(`kayıte_${uye.id}`)
        db.delete(`kayıtk_${uye.id}`)
        db.delete(`kayıterkek_${member.id}`)
        db.delete(`kayıtkız_${member.id}`)

  
  }})
},
    
};