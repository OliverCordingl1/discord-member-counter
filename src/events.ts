/* eslint-disable @typescript-eslint/no-explicit-any */

import {
	Client,
	Guild,
	GuildMember,
	Message,
	PartialGuildMember,
} from 'discord.js';
import { readdirSync } from 'fs';
import * as path from 'path';

export interface IEvent {
	name: string;
	once: boolean;
	execute: (client: Client, args: any) => void;
}

interface IArgs { [k: string]: any }

interface IMessageArgs extends IArgs { message: Message }
interface IGuildCreateDeleteArgs extends IArgs { guild: Guild }
interface IGuildMemberAddRemoveArgs extends IArgs { member: GuildMember | PartialGuildMember }

/**
 * @interface ReadyEvent 'ready' event that will call when the client logs in successfully
 */
export interface ReadyEvent extends IEvent {
	name: 'ready';
	execute: (client: Client) => void;
}

/**
 * @interface GuildCreateEvent 'guildCreate' that will call when the bot joins a new guild
 */
export interface GuildCreateEvent extends IEvent {
	name: 'guildCreate';
	execute: (client: Client, args: IGuildCreateDeleteArgs) => void;
}

/**
 * @interface GuildDeleteEvent 'guildDelete' that will call when the bot leaves a guild
 */
export interface GuildDeleteEvent extends IEvent {
	name: 'guildDelete';
	execute: (client: Client, args: IGuildCreateDeleteArgs) => void;
}

/**
 * @interface GuildMemberAddEvent 'guildMemberAdd' that will call when a new member joins a guild that the bot is in
 */
export interface GuildMemberAddEvent extends IEvent {
	name: 'guildMemberAdd';
	execute: (client: Client, args: IGuildMemberAddRemoveArgs) => void;
}

/**
 * @interface GuildMemberRemoveEvent 'guildMemberRemove' that will call when a member leaves a guild that the bot is in
 */
export interface GuildMemberRemoveEvent extends IEvent {
	name: 'guildMemberRemove';
	execute: (client: Client, args: IGuildMemberAddRemoveArgs) => void;
}

/**
 * @interface InvalidatedEvent 'invalidated' that will call if something goes wrong with the connection
 */
export interface InvalidatedEvent extends IEvent {
	name: 'invalidated';
	execute: () => void;
}

/**
 * @interface MessageEvent 'message' that will call when a message is sent in a guild that the bot is in
 */
export interface MessageEvent extends IEvent {
	name: 'message';
	execute: (client: Client, args: IMessageArgs) => void;
}

/**
 * Parses arguments for IEvents
 * @param name the event trigger to parse
 * @param args an array of arguments to parse
 * @returns IArgs
 */
export function parseArgs(name: string, args: any[]): IArgs {
	switch (name) {
	case 'message':
	{
		const r : IMessageArgs = { message: args[0] };
		return r;
	}
	case 'guildCreate': case 'guildDelete':
	{
		const _ : IGuildCreateDeleteArgs = { guild: args[0] };
		return _;
	}
	case 'guildMemberAdd': case 'guildMemberRemove':
	{
		const _ : IGuildMemberAddRemoveArgs = { member: args[0] };
		return _;
	}
	default:
		return {};
	}
}

export function loadEvents(client: Client): Promise<void> {
	return new Promise((resolve, reject) => {
		const eventPath = path.resolve(__dirname, 'events');
		readdirSync(eventPath)
			.filter(filename => filename.endsWith('js') || filename.endsWith('ts'))
			.forEach(async (filename, index, list) => {
				try {
					const e: IEvent = (await import(path.resolve(eventPath, filename))).default;
					if (e.once)
						client.once(e.name, (...args) =>
							e.execute(client, parseArgs(e.name, args)));
					else
						client.on(e.name, (...args) =>
							e.execute(client, parseArgs(e.name, args)));
					console.log(`Loaded event: \`${e.name}\`${e.once ? ' once' : ''}. (${index + 1} / ${list.length})`);
				} catch (error) {
					reject(error);
				}
			});
		resolve();
	});
}