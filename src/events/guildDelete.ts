import { GuildDeleteEvent } from '../events';
import { setStatus } from '../Modules';

const e: GuildDeleteEvent = {
	name: 'guildDelete',
	once: false,
	execute(client, { guild }): void {
		if (!guild.available) return;

		setStatus(client, client.guilds.cache.size);

		console.log(`Removed from \`${guild.name}\` [Owner: \`${guild.owner?.user.username}\`]`);
	},
};

export default e;
