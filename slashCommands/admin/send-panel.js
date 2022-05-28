const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "send-panel",
  description: "Send ticket panel to specific channel!",
  usage: "/send-panel <channel>",
  dir: "message",
  cooldown: 1,
  examples: ["send-panel", "send-panel channel:welcome"],
  liases: ["send-ticket"],
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

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("SECONDARY")
        .setEmoji("📩")
        .setCustomId("create-ticket")
    );

    const embed = new MessageEmbed()
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
      .setColor(client.config.embedColor);

    interaction.reply({
      content: `Ticket panel success send to ${channel}!`,
      ephemeral: true,
    });
    return channel.send({ embeds: [embed], components: [row] });
  },
};
