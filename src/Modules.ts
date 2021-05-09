import {
	Client,
	Collection,
	Guild,
	GuildMember,
	Snowflake,
} from 'discord.js';

export interface IGuildMemberCount {
	totalMembers: number;
	botMembers: number;
	humanMembers: number;
}

export function countMembers(bot: Client, guildID: Snowflake): Promise<IGuildMemberCount | null> {
	return new Promise((resolve) => {
		const guild: Guild | undefined = bot.guilds.cache.get(guildID);
		if (!guild || !guild.available) resolve(null);

		const totalMembers: number = guild?.memberCount || 0;
		let botMembers: number;
		let humanMembers: number;

		guild?.members.fetch()
			.then((members: Collection<Snowflake, GuildMember>) => {
				botMembers = members.filter((member: GuildMember) => member.user.bot).size;
				humanMembers = totalMembers - botMembers;

				resolve({
					totalMembers: Math.abs(totalMembers),
					botMembers: Math.abs(botMembers),
					humanMembers,
				});
			});
	});
}

export function setStatus(bot: Client, guildSize: number): void {
	if (guildSize === 0) {
		bot.user?.setPresence({
			status: 'idle',
			activity: {
				name: 'Lonely :(',
			},
		});
	} else if (guildSize > 1) {
		bot.user?.setPresence({
			status: 'online',
			activity: {
				name: `Running on ${guildSize} servers`,
			},
		});
	} else if (guildSize === 1) {
		const firstKey = bot.guilds.cache.firstKey();
		if (!firstKey) return;
		countMembers(bot, firstKey)
			.then((members: IGuildMemberCount | null) => {
				bot.user?.setPresence({
					status: 'online',
					activity: {
						name: `${members?.humanMembers || 'UNKNOWN'} members`,
					},
				});

			});
	}
}