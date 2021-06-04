
const Discord = require("discord.js");
const config = require("../config.json");
var prefix = config.BotPrefix;

module.exports = async client => {
  var oyun = [config.BotBio, ]

  setInterval(async () => {
    var random = Math.floor(Math.random() * (oyun.length - 0 + 1) + 0);

    client.user.setActivity(oyun[random], { type: "WATCHING" });
    }, 25000);
  client.user.setStatus("dnd"); 
};