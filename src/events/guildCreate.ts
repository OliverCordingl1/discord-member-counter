import { GuildCreateEvent } from '../events';
import { setStatus } from '../Modules';

const e: GuildCreateEvent = {
	name: 'guildCreate',
	once: false,
	execute(client, { guild }): void {
		if (!guild.available) return;

		setStatus(client, client.guilds.cache.size);
		console.log(`Added to \`${guild.name}\` [Owner: \`${guild.owner?.user.username}\`]`);
	},
};

export default e;
