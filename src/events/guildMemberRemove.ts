import { GuildMemberRemoveEvent } from '../events';
import { setStatus } from '../Modules';

const e: GuildMemberRemoveEvent = {
	name: 'guildMemberRemove',
	once: false,
	execute(client, {}): void {
		setStatus(client, client.guilds.cache.size);
	},
};

export default e;
