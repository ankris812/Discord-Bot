const Discord = require("discord.js");
const client = new Discord.Client();
const Enmap = require("enmap");

const core = require('./core/core');
const config = require("./config/config.json");
const helper = require("./core/helper");

client.modules = new Enmap();
client.commands = new Enmap();

client.once("ready", () => {
	console.log("------------------");
	console.log("Kalliope - Discord Bot");
	console.log("------------------");
	console.log("\nStarting... ");
    console.log('\nBot is ready');
    console.log('----------------\n');
    console.log('Bot Name: '+ client.user.username);
    console.log('Connected to '+ client.guilds.cache.array().length+ ' servers with total '+client.channels.cache.array().length +' channels');
    console.log('----------------\n');
	core.loadAll(client);
	// Loading dependencies...
	const dependencies = require("./dependencies/init");
	client.helper = helper;
	client.Discord = Discord;
	client.war = {
		"war": false
	}
	client.members = {
		"members": {}
	}
	dependencies(client);
});
 
client.on("message", (message) => {
	if (message.author.bot) return;
  	if (message.content.indexOf(config.prefix) !== 0) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	core.bootstrap(client, message, args);
	let copyArgs = args.slice();
  	const command = args.shift().toLowerCase();

  	let module = client.commands.get(command);
  	if(!module) return;
  	const cmd = client.modules.get(module)[command];
  	if (typeof cmd !== 'function') return;
  	cmd(client, message, args)
});

client.on("guildCreate", guild => {
    client.guildsModel.create(client, guild.id);
})

client.on("error", (e) => console.error(e));

client.login(config.token);
