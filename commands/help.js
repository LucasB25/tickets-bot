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
            }), "https://discord.gg/D7pq3m3")
            .setThumbnail(client.user.avatarURL())
            .setDescription(`**Used the prefix**: \`\`pt\`\` \n`)
            .addField("**• Staffs**", "\`\`ptsetup\`\`.")
            .addField("**• Information**", "\`\`pthelp\`\`, \`\`ptavatar\`\`, \`\`ptguildicon\`\`.")
            .addField("**• Support**", "\`\`ptping\`\`, \`\`ptbotinfo\`\`.")
            .setColor("#ffffff")
            .addField(`**Support**`, `• [\`Click here\`](https://discord.gg/D7pq3m3)`, !0)
            .addField(`**Invite me**`, `• [\`Click here\`](https://discord.com/oauth2/authorize?client_id=912442038765633597&scope=bot&permissions=805694513)`, !0)
            .addField(`**Top.gg**`, `• [\`Click here\`](https://top.gg/bot/912442038765633597)`, !0)
            .setFooter("Help page ")
  
        message.channel.send({
            embeds: [embed]
        });
    }}