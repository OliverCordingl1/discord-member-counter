/* eslint-disable @typescript-eslint/no-explicit-any */

import {
	Client,
	Guild,
	GuildMember,
	Message,
	PartialGuildMember,
} from 'discord.js';

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

/****
 * 
 * 	note to self
 * 
 * 
 * the idea is to have an object with bindings to each argument
 * interface that i have just created.
 * 
 * 
 * no idea how to do it. leaving it up to you now :)
 * 
 * 
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