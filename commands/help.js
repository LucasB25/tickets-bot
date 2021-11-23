const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ["commands", "aide", "cmd", "h"],

    execute(client, message) {
        const embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 1024
            }), "https://discord.gg/DISCORD_INVITE_ID")
            .setThumbnail(client.user.avatarURL())
            .setDescription(`**Used the prefix**: \`\`pt\`\` \n`)
            .addField("**• Staffs**", "\`\`!setup\`\`.")
            .addField("**• Information**", "\`\`!help\`\`.")
            .addField("**• Support**", "\`\`!ping\`\`.")
            .setColor("#ffffff")
            .addField(`**Support**`, `• [\`Click here\`](https://discord.gg/DISCORD_INVITE_ID)`, !0)
            .addField(`**Invite me**`, `• [\`Click here\`](https://discord.com/oauth2/authorize?client_id=(BOT_ID)&scope=bot&permissions=805694513)`, !0)
            .setFooter("Help page ")
  
        message.channel.send({
            embeds: [embed]
        });
    }}
