const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',

    execute(client, message) {
        const embed = new MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL({
            format: 'png',
            dynamic: true,
            size: 1024
        }), "https://discord.gg/DISCORD_INVITE_ID")
        .setDescription(`**Discord latency**: \`${message.client.ws.ping}ms\``)
        .setThumbnail(client.user.avatarURL())
        .setTimestamp()
        .setColor("#ffffff")
        
        message.channel.send({
            embeds: [embed]
        });
    },
};
