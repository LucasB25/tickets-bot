const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async run(client, interaction) {
    if (!interaction.isButton()) return;
    if (interaction.customId === "create-ticket") {
      if (
        interaction.guild.channels.cache.some(
          (c) => c.name === interaction.user.id
        )
      ) {
        return interaction.reply({
          content: "You’ve already created a ticket!",
          ephemeral: true,
        });
      }

      let ticketName = `ticket-${interaction.user.username}`.toLowerCase();
      let supportRoles = await client.config.ticketsSupportRoles.map((x) => {
        return {
          id: x,
          allow: [
            "VIEW_CHANNEL",
            "SEND_MESSAGES",
            "ATTACH_FILES",
            "EMBED_LINKS",
            "MANAGE_MESSAGES",
            "READ_MESSAGE_HISTORY",
            "USE_EXTERNAL_EMOJIS",
          ],
        };
      });

      await interaction.reply({
        content: `Creating ticket...`,
        ephemeral: true,
      });

      if (
        interaction.guild.channels.cache.find(
          (c) => c.topic == interaction.user.id && c.name.includes("ticket")
        )
      )
        return interaction.editReply({
          content: `You have already created a ticket!`,
          ephemeral: true,
        });

      const createdChannel = await interaction.guild.channels.create(
        ticketName,
        {
          type: "text",
          topic: `${interaction.user.id}`,
          parent: client.config.ticketsCategory,
          permissionOverwrites: [
            {
              allow: [
                "VIEW_CHANNEL",
                "SEND_MESSAGES",
                "ATTACH_FILES",
                "EMBED_LINKS",
                "READ_MESSAGE_HISTORY",
                "USE_EXTERNAL_EMOJIS",
              ],
              id: interaction.user.id,
            },
            {
              deny: "VIEW_CHANNEL",
              id: interaction.guild.id,
            },
            ...supportRoles,
          ],
        }
      );

      await interaction.editReply({
        content: `Ticket created successfully in ${createdChannel}!`,
        ephemeral: true,
      });

      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle("DANGER")
          .setEmoji("🔒")
          .setCustomId("ticket-close")
      );

      const embed = new MessageEmbed()
        .setTitle("New Ticket!")
        .setDescription(
          `Hello <@!${interaction.user.id}>, a staff will assist you shortly!\n\n**Press the 🔒 button to close the ticket!**`
        )
        .setColor(client.config.embedColor)
        .setTimestamp();

      await createdChannel.send({
        content: `${client.config.ticketsSupportRoles
          .map((m) => `<@&${m}>`)
          .join(", ")}`,
        embeds: [embed],
        components: [row],
      });
    }
  },
};
