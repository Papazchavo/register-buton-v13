const Discord = require("discord.js");
const db = require("croxydb");
const ayarlar = require("../config.json");
const moment = require("moment");
moment.locale("tr");
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
	name: 'taglıalım',
	description: 'taglı alım.',
	aliases: ['taglı-alım'],
	usage: 'taglıalım',
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
       if(!message.member.permissions.has("ADMINISTRATOR") ){
        message.channel.send(`${cross} ${message.author} İşlemi gerçekleştirmek için gerekli yetkiye sahip değilsin!`)
        message.react(cross2)
        return
      }
      //////////////////////////////////////////////////////
      const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('ac')
					.setLabel('Aç')
                    .setEmoji("945389225010921482")
					.setStyle('SUCCESS'),
                    new MessageButton()
					.setCustomId('kap')
                    .setEmoji("945389227108081670")
					.setLabel('Kapat')
					.setStyle('DANGER'),
                    );
    ////////////////////////////////////////////////////////////////
    const kardoxam = new Discord.MessageEmbed()
    .setTitle("Taglı alım sistemi")
    .setFooter(ayarlar.footer)
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
    .setColor("RANDOM")
    .setDescription(`Merhaba ${message.author.toString()}! Taglı alım sistemini açıp kapatmak için aşşağıdaki alternatif butonları kullanabilirsin.`)
    message.reply({embeds: [kardoxam], components: [row]})

    const filter = i => i.user.id === message.author.id


    const collector = message.channel.createMessageComponentCollector({ filter, time: 50000 });

      collector.on("collect", async i => {

        
if(i.customId === "ac") {
    db.set(`taglıalım`, "1")
    const kardoxa = new Discord.MessageEmbed()
    .setTitle("Başarılı!")
    .setFooter(ayarlar.footer)
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
    .setColor("RANDOM")
    .setDescription(`Taglı alım modu **açık** olarak değiştirildi!`)
await i.deferUpdate();
i.editReply({ components: [], embeds: [kardoxa]})


      }
      if(i.customId === "kap") {
        db.set(`taglıalım`, "0")
        const kardoxa = new Discord.MessageEmbed()
        .setTitle("Başarılı!")
        .setFooter(ayarlar.footer)
        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
        .setColor("RANDOM")
        .setDescription(`Taglı alım modu **kapalı** olarak değiştirildi!`)
    await i.deferUpdate();
    i.editReply({ components: [], embeds: [kardoxa]})
    
    
          }
      })
        
	},
};