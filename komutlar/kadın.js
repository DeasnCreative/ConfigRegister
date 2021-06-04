const { Discord, MessageEmbed } = require("discord.js");
const config = require("../config.json");

exports.run = async (client, message, args) => {


  let kız = config.WomanRole1;
  let kayıtsız = config.UnregisteredRole;
  let kız2 = config.WomanRole2;
  let yetkili = config.RegistererRole;
  const log = config.LogChannel;
  const rules = config.RulesChannel;
  const chat = config.ChatChannel;

 let registerer = config.RegistererRole

 if (!message.member.roles.cache.has(registerer) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setDescription('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!').setColor("Black"));

  if (!args[0]) return message.channel.send(`Bir üye belirtmelisin!`);

  let kullanıcı = message.mentions.users.first();
  if (!kullanıcı)
    return message.channel.send(`${args[0]}, üyesi sunucuda bulunamadı!`);
  if (kullanıcı.bot) return;

  let isim = args[1];

  if (!isim) return message.channel.send(`İsim belirtmelisin!`);

  let yaş = args[2];
  if (!yaş) return message.channel.send(`Yaş belirtmelisin!`);

  const wowo = new MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setThumbnail(client.user.avatarURL())
    .setTimestamp()
    .setColor(`#fffff0`);
  const tag = config.SymbolTag;
  message.guild.members.cache
    .get(kullanıcı.id)
    .setNickname(`${tag} ${isim} | ${yaş}`);
  message.guild.members.cache.get(kullanıcı.id).roles.add(kız);
  message.guild.members.cache.get(kullanıcı.id).roles.add(kız2);
  message.guild.members.cache.get(kullanıcı.id).roles.remove(kayıtsız);
  message.guild.members.cache
    .get(kullanıcı.id)
    .send(
      wowo.setDescription(
        `Kaydın ${message.author} tarafından **kadın** olarak yapıldı.
        Aramıza hoşgeldin dostum! .tag alarak ailemize katılabilirsin.
        <#${rules}> okumayı unutma! Kayıdında bir yanlışlık varsa yetkililere ulaş!`
      )
    );

  let embed2 = new MessageEmbed().setColor(`RANDOM`).setTimestamp().setDescription(`
\`${tag} ${isim} | ${yaş}\` adıyla kaydedildi. *K*
Kayıt Edilen Kullanıcı: ${kullanıcı}
Kayıt Eden Yetkili: ${message.author}
`);
  client.channels.cache.get(log).send(embed2);

  let embed4 = new MessageEmbed().setColor(`RANDOM`).setTimestamp().setDescription(`
  ${kullanıcı} aramıza katıldı! Hoş geldin dostum **|** .tag alarak ailemize katılabilirsin.
  `)
   client.channels.cache.get(chat).send(embed4);

  let embed3 = new MessageEmbed().setColor(`RANDOM`).setTimestamp().setDescription(`
${kullanıcı} kişinin kaydı, ${message.author} tarafından **kadın** olarak yapıldı.
`);
  message.channel.send(embed3);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["k"],
  permLevel: 0
};

exports.help = {
  name: "kadın"
}; 
