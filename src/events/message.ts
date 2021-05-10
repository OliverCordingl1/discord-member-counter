
import Command from '../Command';
import { MessageEvent } from '../events';
import { MessageEmbed } from 'discord.js';
import { IGuildMemberCount, countMembers } from '../Modules';
import Settings from '../Settings';

const e: MessageEvent = {
	name: 'message',
	once: false,
	execute(client, { message }) {
		if (message.author.bot) return;
		if (message.channel.type === 'dm') return;
		if (!message.content.startsWith(Settings.prefix)) return;

		const command: Command = new Command(message.content);
		switch(command.command) {
		case 'count':
			const guildID = message.guild?.id;
			if (!guildID) return;
			countMembers(client, guildID)
				.then((members: IGuildMemberCount | null) => {
					const embed: MessageEmbed = new MessageEmbed();
					if (!members) {
						embed
							.setTitle(`**Error counting members in ${message.guild?.name}**`)
							.setColor('DARK_RED')
							.setAuthor(`${client.user?.username}`);
							
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
	},
};

export default e;
