import { Client, GuildMember, PartialGuildMember } from "discord.js";

const e = {
	name: 'guildMemberRemove',
	once: false,
	execute (_member: GuildMember | PartialGuildMember, client: Client) {
		setStatus(client, client.guilds.cache.size);
	}
};

module.exports = e;