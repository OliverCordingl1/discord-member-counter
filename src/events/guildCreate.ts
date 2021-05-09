import { Client, Guild } from "discord.js";

const e = {
	name: 'guildCreate',
	once: false,
	execute (guild: Guild, client: Client) {
		if (!guild.available) return;

		setStatus(client, client.guilds.cache.size);
		console.log(`Added to \`${guild.name}\` [Owner: \`${guild.owner?.user.username}\`]`);
	}
};

module.exports = e;