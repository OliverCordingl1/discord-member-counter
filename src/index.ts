import dotenv from 'dotenv';
dotenv.config();

if (!process.env.DISCORD_API_TOKEN) {
	console.error('Discord API token not set');
	process.exit(1);
}

import * as Discord from 'discord.js';
import { loadEvents } from './events';

const client:Discord.Client = new Discord.Client();

loadEvents(client).then(() => {
	client.login(process.env.DISCORD_API_TOKEN);
}).catch((error) => {
	console.error('There was a problem loading in events.');
	console.error(error);
	process.exit(1);
});
