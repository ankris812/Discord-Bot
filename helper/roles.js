'use strict';

var helper = {
    description: "War helper"
}

helper.reAsignRole = function(message, roleName) {
    let roleToKeep = ['VIP', 'Filthy Outsider', 'Carrying Fury Scrubs', 'Guest', 'Ng0k', '( ͡° ͜ʖ ͡°)', roleName];
    let roles = message.member.roles;
    let role = message.guild.roles.find(r => r.name === roleName);
    if(!role) return;
    if(!message.member.roles.has(role.id)) {
        console.log('Not has this role');
        message.member.addRole(role).catch((e) => {
            console.log(e);
        });
    }
    /* Now add role to member */
    
    let isOfficer = roles.some(role => role.name === 'Officer');
    if(isOfficer) return;
    roles = roles.filter(function(role) {
        if(!roleToKeep) return true;
        if(roleToKeep.constructor !== Array) {
            return role.name !== roleToKeep;
        }
        let result = true;
        for(let i in roleToKeep) {
            if(role.name == roleToKeep[i]){
                result = false;
            }
        }
        return result;
    });
    message.member.removeRoles(roles).catch(err => {
        console.log(err);
    });
}

module.exports = helper;