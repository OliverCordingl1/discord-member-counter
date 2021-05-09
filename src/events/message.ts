import { Client, Message } from "discord.js";
import { Command } from "../Command";

const e = {
	name: 'message',
	once: false,
	execute (message: Message, client: Client) {
		if (message.author.bot) return;
		if (message.channel.type === 'dm') return;
		if (!message.content.startsWith(BOT_PREFIX)) return;

		const command: Command = new Command(message.content);
		switch(command.command) {
		case 'count':
			const guildID = message.guild?.id;
			if (!guildID) return;
			countMembers(client, guildID)
				.then((members: guildMemberCount | null) => {
					const embed: Discord.MessageEmbed = new Discord.MessageEmbed();
					if (!members) {
						embed
							.setTitle(`**Error counting members in ${message.guild?.name}**`)
							.setColor('DARK_RED')
							.setAuthor(`${client.user?.username}`)
							
					} else {
						embed
							.setTitle(`***Member Counts for ${message.guild?.name}***`)
							.setColor('DARK_GREEN')
							.setFooter(`${client.user?.username}`)
							.setThumbnail(message.guild?.iconURL() || '')
							.addField('**HUMAN MEMBERS:**', `\`${members.humanMembers}\``, true)
							.addField('**BOT MEMBERS:**', `\`${members.botMembers}\``, true)
							.addField('**TOTAL MEMBERS:**', `\`${members.totalMembers}\``, true);
					}

					message.channel.send(embed);
				});
		}
	}
};

module.exports = e;