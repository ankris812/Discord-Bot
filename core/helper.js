'use strict';

module.exports = {
    logInfo: function (content, message = null) {
        if (!message) {
            console.log(content);
            return;
        }
        message.channel.send(content);
    },

    isMe: function (user) {
        return (user.id === '166795785915203584');
    },

    /* Send message to all guilds in main channel */
    sendMessageToGuilds: function (message, client) {
        let guilds = client.guilds;
        if(!guilds) return;
        guilds.tap(function (guild) {
            let channel = guild.channels.find(function(ch) {
                return ch.name === 'general' || ch.name === 'chat';
            });
            if(!channel) return;
            channel.send(message);
        });
    },

    /* Send message to all guilds in main channel */
    setGuildsTopic: function (message, client) {
        let guilds = client.guilds;
        if(!guilds) return;
        guilds.tap(function (guild) {
            let channel = guild.channels.find(ch => ch.name === 'general' || ch.name === 'chat');
            if(!channel) return;
            channel.setTopic(message).catch(console.error);
        });
    },

    /* Send a help message */
    sendHelpMessage(message, content, cover = false) {
        let coverBox = '';
        if(cover) {
            coverBox = '```';
        }
        message.channel.send(coverBox + content + coverBox);
    },
    /* Create main config */
    createMainConfig: function(fs) {
        var json = {
            "bot": {
                "token": "",
                "prefix": ""
            },
            "autoload": []
        };
        json = JSON.stringify(json, null, 4);
        fs.writeFileSync('./config.json', json, 'utf8', 'w', (err) => {
            if (!err) {
                console.log('Configuration file created successfully!');
            }
        });
        console.log("Create");
    },

    /* Save an configuration file. :) */
    saveMainConfig: function(fs, json) {
        json = JSON.stringify(json, null, 4);
        fs.writeFile('./config.json', json, (err) => {
            if (!err) {
                console.log('Configuration file saved successfully!');
            }
        });
    },

    /* Create loaded module config */
    saveCommandConfig: function(fs, client) {
        let json = {};
        client.commands.keyArray().forEach(function(cmd) {
            let module = client.commands.get(cmd);
            json[cmd] = module;

        });
        json = JSON.stringify(json, null, 4);
        fs.writeFileSync('./config/commands.json', json, 'utf8', 'w', (err) => {
            if (!err) {
                console.log('Configuration file created successfully!');
            }
        });
    },

    saveModuleConfig: function(fs, client) {
        let json = {};
        Array.from(client.modules.keys()).forEach(function(module) {
            json[module] = true;

        });
        json = JSON.stringify(json, null, 4);
        fs.writeFileSync('./config/modules.json', json, 'utf8', 'w', (err) => {
            if (!err) {
                console.log('Configuration file created successfully!');
            }
        });
    },

    saveConfig: function(fs, client) {
        this.saveCommandConfig(fs, client);
        this.saveModuleConfig(fs, client);
    },

    isNormalInteger: function(str) {
        let n = Math.floor(Number(str));
        return n !== Infinity && n >= 0;
    },

};