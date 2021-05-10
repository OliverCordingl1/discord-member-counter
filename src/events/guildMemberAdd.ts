import { GuildMemberAddEvent } from '../events';
import { setStatus } from '../Modules';

const e: GuildMemberAddEvent = {
	name: 'guildMemberAdd',
	once: false,
	execute(client, {}): void {
		setStatus(client, client.guilds.cache.size);
		return;
	},
};

export default e;
