const sourcebin = require("sourcebin_js");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async run(client, interaction) {
    if (!interaction.isButton()) return;

    if (
      interaction.customId === "ticket-delete" &&
      interaction.channel.name.includes("close")
    ) {
      const channel = interaction.channel;
      const member = interaction.guild.members.cache.get(channel.topic);
      const transcriptsChannel = interaction.guild.channels.cache.get(
        client.config.ticketsTranscripts
      );

      const rowCloseFalse = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle("DANGER")
          .setEmoji("🗑️")
          .setDisabled(true)
          .setCustomId("ticket-delete")
      );

      interaction.message.edit({ components: [rowCloseFalse] });

      interaction.deferUpdate();

      let msg = await channel.send({ content: "Saving transcript..." });
      channel.messages.fetch().then(async (messages) => {
        const content = messages
          .reverse()
          .map(
            (m) =>
              `${new Date(m.createdAt).toLocaleString("en-US")} - ${
                m.author.tag
              }: ${
                m.attachments.size > 0
                  ? m.attachments.first().proxyURL
                  : m.content
              }`
          )
          .join("\n");

        let transcript = await sourcebin.create(
          [{ name: `${channel.name}`, content: content, languageId: "text" }],
          {
            title: `Chat transcript: ${channel.name}`,
            description: " ",
          }
        );

        const row = new MessageActionRow().addComponents(
          new MessageButton()
            .setStyle("LINK")
            .setEmoji("📑")
            .setURL(`${transcript.url}`)
        );

        const embed = new MessageEmbed()
          .setTitle("Ticket Transcript")
          .addFields(
            { name: "Channel", value: `${interaction.channel.name}` },
            { name: "Ticket Owner", value: `<@!${member.id}>` },
            {
              name: "Direct Transcript",
              value: `[Direct Transcript](${transcript.url})`,
            }
          )
          .setColor(client.config.embedColor);

        await transcriptsChannel.send({ embeds: [embed], components: [row] });
      });

      await msg.edit({
        content: `Transcript saved to <#${transcriptsChannel.id}>`,
      });

      await channel.send({ content: "Ticket will be deleted in 5 seconds!" });

      setTimeout(async function () {
        channel.delete();
      }, 5000);
    }
  },
};
