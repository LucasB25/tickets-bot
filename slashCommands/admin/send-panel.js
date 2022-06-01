const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "send-panel",
  description: "Send ticket panel to specific channel.",
  usage: "/send-panel <channel>",
  dir: "message",
  cooldown: 1,
  examples: ["send-panel", "send-panel channel:ticket"],
  aliases: ["send-ticket"],
  permissions: ["ADMINISTRATOR"],
  ownerOnly: true,
  options: [
    {
      name: "channel",
      description: "Channel to send ticket panel!",
      type: "7",
      channelTypes: ["GUILD_TEXT"],
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const channel = interaction.options.getChannel("channel");

    interaction.channel.send({
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setStyle("SECONDARY")
            .setEmoji("📩")
            .setCustomId("create-ticket")
        ),
      ],
      embeds: [
        new MessageEmbed()
          .setTitle("Create ticket")
          .setDescription(
            "Do you need any help or request from the founder or an administrator?\n\n" +
              "To create a ticket react with 📩"
          )
          .setAuthor({
            name: client.user.username,
            iconURL: client.user.displayAvatarURL(),
          })
          .setThumbnail(client.user.displayAvatarURL())
          .setColor(client.config.embedColor),
      ],
    });
    interaction.reply({
      content: `Ticket panel success send to ${channel}!`,
      ephemeral: true,
    });
  },
};
