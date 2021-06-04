const Discord = require("discord.js");
require("events").EventEmitter.defaultMaxListeners = 30000;
require("events").defaultMaxListeners = 30000;
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
require("./util/eventLoader")(client);
const express = require("express");
const app = express();
const http = require("http");
var Jimp = require("jimp");
const log = message => {
  console.log(`{ ${message} } `);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yükleniyor.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  return permlvl;
};

client.login(config.BotToken);

client.on("ready", async => {
client.channels.cache.get(config.JoinChannel).join();
})

client.on("ready", async => {
console.log(`${client.user.username} aktif oldu!`)
})

///---HOŞ GELDİN MESAJI---\\\ ⬇


client.on("guildMemberAdd", member => {
  const moment = require("moment");
  const kanal = config.WelcomeChannel;
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kurulus = new Date().getTime() - user.createdAt.getTime();

var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
var üs = üyesayısı.match(/([0-9])/g)
üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs) {
üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
return {
  '0': `<a:sifir:817810687295488021>`,
  '1': `<a:bir:817810658107457536>`,
  '2': `<a:iki:817810729239052318>`,
  '3': `<a:uc:817810760201404478>`,
  '4': `<a:dort:817810792660992050>`,                       
  '5': `<a:bes:817810822113656832>`,
  '6': `<a:alti:817810853565956179>`,
  '7': `<a:yedi:817810888677523457>`,
  '8': `<a:sekiz:817810921115090975>`,
  '9': `<a:dokuz:817810948198236162>`}[d];})}


  var kontrol;
  if (kurulus < 1209600000) kontrol = "Kullanıcı **Şüpheli!**";
  if (kurulus > 1209600000) kontrol = "Kullanıcı **Güvenli!**";
  moment.locale("tr");

    client.channels.cache.get(kanal).send(`Sunucumuza hoş geldin! ${member} (${member.id})
 
                 Hesabın ${moment(member.user.createdAt).format("DD MMMM YYYY dddd")} tarihinde oluşturulmuş. Seninle beraber ${üyesayısı} kişi olduk!

                 Sunucu kurallarımız <#${config.RulesChannel}> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.
 
Tagımızı alarak bizlere destek olabilirsin \`${config.SymbolTag}\`. Kayıt olmak için teyit odalarına girip ses teyit vermen gerekiyor yetkililerimiz seninle ilgilenecektir!
`)
});


///---OTO-TAG ROL---\\\ ⬇


client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = config.SymbolTag
  const sunucu = config.GuildID
  const kanal = config.LogChannel
  const rol = config.CrewRole

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser.username}, Sunucumuzda ${tag} Tagımızı Aldığın İçin <@&${rol}> Rolünü Sana Verdim!`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser}, ${tag} tagımızı çıkardığı için <@&${rol}> rolünü aldım.`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser}, Sunucumuzda ${tag} tagımızı çıkardığın için <@&${rol}> rolünü senden aldım! Yeniden tag almak için: *.tag*`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }   
}
});


///---OTO-ROL---\\\ ⬇


client.on(`guildMemberAdd`, async member => {
  member.roles.add(config.UnregisteredRole);
});


///---TAG YAZINCA ATMA---\\\ ⬇


client.on('message', msg => {
  if (msg.content.toLowerCase() === '.tag') { 
    msg.channel.send(`\`${config.SymbolTag}\``); 
  }
}); 

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'tag') { 
    msg.channel.send(`\`${config.SymbolTag}\``); 
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!tag') { 
    msg.channel.send(`\`${config.SymbolTag}\``); 
  }
}); 

client.on('message', msg => {
  if (msg.content.toLowerCase() === '-tag') { 
    msg.channel.send(`\`${config.SymbolTag}\``); 
  }
});


///---TAG KONTROL---\\\ ⬇


    client.on("guildMemberAdd", member => {
      let sunucuid = config.GuildID; 
      let tag = config.SymbolTag;
      let rol = config.CrewRole; 
    if(member.user.username.includes(tag)){
    member.roles.add(rol)
      const tagalma = new Discord.MessageEmbed()
          .setColor(`RANDOM`)
          .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden!`)
          .setTimestamp();
         client.channels.cache.get(config.LogChannel).send(tagalma)
    }
    })


///---YENİ HESAP KORUMASI---\\\ ⬇


    client.on("guildMemberAdd", member => {
        var moment = require("moment")
        require("moment-duration-format")
        moment.locale("tr")
         var {Permissions} = require('discord.js');
         var x = moment(member.user.createdAt).add(7, 'days').fromNow()
         var user = member.user
         x = x.replace("birkaç saniye önce", " ")
         if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
         let kytsz = config.UnregisteredRole
         let jailed = config.JailedRole
         member.roles.add(jailed)
         member.roles.remove(kytsz)
    
      member.user.send('Selam dostum! Discord hesabın `7 günden önce` açıldığı için sunucumuzda cezalı kategorisine düştün. \nBir yanlışlık olduğunu düşünüyorsan yetkililere ulaş!');

      client.channels.cache.get(config.WelcomeChannel).send(`${member} kullanıcısı hesabı **7 günden önce açıldığı** için cezalıya atıldı!`)
      setTimeout(() => {
      
      }, 1000)
      
      
         }
              else {
      
              }
          });