const Discord = require("discord.js");
const db = require("croxydb");
const ayarlar = require("../config.json");
const moment = require("moment");
moment.locale("tr");
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
	name: 'işlem',
	description: 'işlem yap.',
	aliases: ['transaction'],
	usage: 'işlem @user',
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
        if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(ayarlar.yetkili)){
         message.channel.send(`${cross} ${message.author} İşlemi gerçekleştirmek için gerekli yetkiye sahip değilsin!`)
         message.react(cross2)
         return
       }
       //////////////////////////////////////////////////////
       const row = new MessageActionRow()
       .addComponents(
           new MessageButton()
               .setCustomId('k')
               .setLabel('Kayıtsıza at')
               .setEmoji("903659047620857937")
               .setStyle('SUCCESS'),
               new MessageButton()
               .setCustomId('i')
               .setEmoji("932942328203710484")
               .setLabel('İsim geçmişini temizle')
               .setStyle('SUCCESS'),
               new MessageButton()
               .setCustomId('cancel')
               .setEmoji("948640798470197288")
               .setLabel('İptal')
               .setStyle('DANGER'),
               );
               const row2 = new MessageActionRow()
       .addComponents(
           new MessageButton()
               .setCustomId('k')
               .setDisabled(true)
               .setLabel('Kayıtsıza at')
               .setEmoji("903659047620857937")
               .setStyle('SUCCESS'),
               new MessageButton()
               .setCustomId('i')
               .setDisabled(true)
               .setEmoji("932942328203710484")
               .setLabel('İsim geçmişini temizle')
               .setStyle('SUCCESS'),
               new MessageButton()
               .setCustomId('cancel')
               .setDisabled(true)
               .setEmoji("948640798470197288")
               .setLabel('İptal')
               .setStyle('DANGER'),
               );
               const x = new MessageActionRow()
       .addComponents(
               new MessageButton()
               .setCustomId('g')
               .setLabel('↩️ Geri')
               .setStyle('DANGER'),
               );

       //////////////////////////////////////////////////////
       var member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
       if(!member){
           message.reply(`Bir kullanıcı belirtmelisin! (@Papaz/ID)`)
           message.react(db.fetch("cross"))
           return;
       }
       const papaz = new Discord.MessageEmbed()
       .setTitle(`İşlem seçin!`)
       .setDescription(`Merhaba ${message.author.toString()}! ${member.toString()} kullanıcısına yapmak istediğin işlemi seçmek için aşşağıdaki alternatif butonları kullanabilirsin!`)
       .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
       .setColor("RANDOM")
       .setFooter(ayarlar.footer)
       message.channel.send({embeds : [papaz], components: [row]})
       const filter = i => i.user.id === message.author.id


    const collector = message.channel.createMessageComponentCollector({ filter, time: 50000 });

      collector.on("collect", async i => {
if(i.customId === "k") {
  
    await i.deferUpdate();
    i.editReply({ components: [x], content: `${mark} ${member.toString()} kullanıcısı başarıyla kayıtsıza atıldı!`, embeds: []})
    member.roles.add(ayarlar.unreg)
    member.roles.remove(ayarlar.erkek)
    member.roles.remove(ayarlar.kız)
}
if(i.customId === "i") {
  
    await i.deferUpdate();
    i.editReply({ components: [x], content: `${mark} ${member.toString()} kullanıcısının isim geçmişi başarıyla sıfırlandı!`, embeds: []})
    db.delete(`isimler_${member.id}`)
}
if(i.customId === "cancel") {
  
    await i.deferUpdate();
    i.editReply({ components: [row2], content: `İşlem iptal edildi!`, embeds: []})
}
if(i.customId === "g") {
  
    await i.deferUpdate();
    i.editReply({ components: [row], embeds: [papaz]})
}
    })
	},
};