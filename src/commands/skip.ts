import { EmbedField, SlashCommandBuilder } from "discord.js";
import { createEmbed } from "utils/index.js";
import { Command } from "types/index.js";

const data: Command["data"] = new SlashCommandBuilder()
  .setName("skip")
  .setDescription("Skip current song in Q");

const execute: Command["execute"] = async (interaction, { store, player }) => {
  await player.skip();

  const fields: EmbedField[] = [
    {
      name: "Q",
      value: `${
        store.qLength > 0
          ? "Q empty."
          : `${store.qLength} song(s) in Q  after current song`
      }`,
      inline: false,
    },
  ];

  const embed = createEmbed({
    title: "SONG SKIPPED",
    fields,
  });

  await interaction.reply({ embeds: [embed] });
};

const command: Command = {
  data,
  execute,
};

export default command;
