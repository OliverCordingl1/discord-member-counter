import dotenv from 'dotenv';
dotenv.config();

if (!process.env.DISCORD_API_TOKEN) {
	console.error("Discord API token not set");
	process.exit(1);
}

import * as Discord from 'discord.js';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { IEvent, parseArgs } from './events';

const client:Discord.Client = new Discord.Client();

const eventPath = resolve(__dirname, 'events');
readdirSync(eventPath)
	.filter(filename => filename.endsWith('js') || filename.endsWith('ts'))
	.forEach(async (filename, index, list) => {
		const event: IEvent = (await import(resolve(eventPath, filename))).default;
		if (event.once)
			client.once(event.name, (...args) =>
				event.execute(client, parseArgs(event.name, args)));
		else
			client.on(event.name, (...args) =>
				event.execute(client, parseArgs(event.name, args)));
		console.log(`Loaded event: \`${event.name}\`${event.once ? ' once' : ''}. (${index + 1} / ${list.length})`)
	});

client.login(process.env.DISCORD_API_TOKEN);