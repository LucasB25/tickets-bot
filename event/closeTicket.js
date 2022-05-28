const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async run(client, interaction) {
    if (!interaction.isButton()) return;

    if (
      interaction.customId === "ticket-close" &&
      interaction.channel.name.includes("ticket")
    ) {
      const channel = interaction.channel;
      const member = interaction.guild.members.cache.get(channel.topic);

      const rowPanel = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle("DANGER")
          .setEmoji("🔒")
          .setDisabled(true)
          .setCustomId("ticket-close")
      );

      await interaction.message.edit({ components: [rowPanel] });

      const rowDeleteFalse = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle("DANGER")
          .setEmoji("🗑️")
          .setDisabled(true)
          .setCustomId("ticket-delete")
      );

      const rowDeleteTrue = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle("DANGER")
          .setEmoji("🗑️")
          .setDisabled(false)
          .setCustomId("ticket-delete")
      );

      const embed = new MessageEmbed()
        .setTitle("Close Ticket!")
        .setDescription(
          `Ticket closed by <@!${interaction.user.id}>!\n\n**Press the 🗑️ button to delete the ticket!**`
        )
        .setColor("#00dbff");

      interaction
        .reply({ embeds: [embed], components: [rowDeleteFalse] })
        .then(() =>
          setTimeout(() => {
            interaction.channel.edit({ name: `close-${member.user.username}` });
            interaction.editReply({ components: [rowDeleteTrue] });
          }, 2000)
        );

      interaction.channel.permissionOverwrites.edit(member, {
        VIEW_CHANNEL: false,
      });
    }
  },
};
