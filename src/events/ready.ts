import { Client } from "discord.js";

const e = {
	name: 'ready',
	once: true,
	execute (client: Client) {
		const { size } : { size: number } = client.guilds.cache;

		setStatus(client, size);

		console.log(`Hey, look! I'm alive on ${size} servers!`);
	}
};

module.exports = e;