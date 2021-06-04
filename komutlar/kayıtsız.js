const Discord = require('discord.js');
const config = require("../config.json")
exports.run = async (client, message, args) => {
 let registerer = config.RegistererRole

 if (!message.member.roles.cache.has(registerer) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setDescription('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!').setColor("Black"));
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().addField("Hatalı Kullanım!",`Lütfen bir kullanıcı etiketleyiniz.`).setColor("RANDOM"));
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  member.roles.set(["850461528091262976"])

 let log = config.LogChannel;

     const kanal = message.guild.channels.cache.find(log);
  let embed = new Discord.MessageEmbed() 
  .setColor("RANDOM")
  .setTimestamp()
  .addField(`Kayıtsıza atma işlemi başarılı!`, `${member} **üyesi,** ${message.author} **tarafından kayıtsıza atıldı!**`) 
  .setFooter(`Komutu Kullanan Yetkili: ${message.author.username}` ,message.author.avatarURL({dynamic: true }))
  const embed1 = new Discord.MessageEmbed() 
  return message.channel.send(embed) .then(kanal.send(embed1)).then(m => m.delete({timeout: 20000}));
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayıtsız" , "kayıtsız"],
  permLevel: 0
}
exports.help = {
  name: 'kayıtsız'
}