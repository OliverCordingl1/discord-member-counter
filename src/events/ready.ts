import { ReadyEvent } from '../events';
import { setStatus } from '../Modules';

const e: ReadyEvent = {
	name: 'ready',
	once: true,
	execute(client) {
		const { size } : { size: number } = client.guilds.cache;

		setStatus(client, size);

		console.log(`Hey, look! I'm alive on ${size} servers!`);
	},
};

export default e;