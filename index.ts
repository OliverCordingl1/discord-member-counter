require('dotenv').config();

if (!process.env.DISCORD_API_TOKEN) {
  console.error("Discord API token not set");
  process.exit(1);
}

import * as Discord from 'discord.js';
const client:Discord.Client = new Discord.Client();

const BOT_PREFIX: string = '+-';

interface guildMemberCount {
  totalMembers: number;
  botMembers: number;
  humanMembers: number;
};

function setStatus(bot: Discord.Client, guildSize: number): void {
  if (guildSize === 0) {
    bot.user?.setPresence({
      status: 'idle',
      activity: {
        name: 'Lonely :(',
      },
    });
  } else if (guildSize > 1) {
    bot.user?.setPresence({
      status: 'online',
      activity: {
        name: `Running on ${guildSize} servers`,
      },
    });
  } else if (guildSize === 1) {
    let firstKey = bot.guilds.cache.firstKey();
    if (!firstKey) return;
    countMembers(bot, firstKey)
      .then((members: guildMemberCount | null) => {
        bot.user?.setPresence({
          status: 'online',
          activity: {
            name: `${members?.humanMembers || 'UNKNOWN'} members`,
          },
        });

      });
  }
}

function countMembers(bot: Discord.Client, guildID: Discord.Snowflake): Promise<guildMemberCount | null> {
  return new Promise((resolve) => {
    let guild: Discord.Guild | undefined = bot.guilds.cache.get(guildID);
    if (!guild || !guild.available) resolve(null);

    let totalMembers: number = guild?.memberCount || 0;
    let botMembers: number;
    let humanMembers: number;

    guild?.members.fetch()
      .then((members: Discord.Collection<Discord.Snowflake, Discord.GuildMember>) => {
        botMembers = members.filter((member: Discord.GuildMember) => member.user.bot).size;
        humanMembers = totalMembers - botMembers;

        resolve({
          totalMembers: Math.abs(totalMembers),
          botMembers: Math.abs(botMembers),
          humanMembers,
        });
      });
  });
}

client.on('ready', () => {
  let { size } : { size: number } = client.guilds.cache;

  setStatus(client, size);

  console.log(`Hey, look! I'm alive on ${size} servers!`);
});

class Command {
  private fullMessage: string;
  private fullCommand: string[];
  command: string;
  args: string[];

  constructor(c: string) {
    this.fullMessage = c;
    this.fullCommand = this.fullMessage.split(' ');
    this.command = this.fullCommand[0].slice(BOT_PREFIX.length);
    this.args = this.fullCommand.slice(1);
  } 
}

client.on('message', (message: Discord.Message) => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  if (!message.content.startsWith(BOT_PREFIX)) return;

  let command: Command = new Command(message.content);
  switch(command.command) {
  case 'count':
    let firstKey = client.guilds.cache.firstKey();
    if (!firstKey) return;
    countMembers(client, firstKey)
      .then((members: guildMemberCount | null) => {
        let embed: Discord.MessageEmbed = new Discord.MessageEmbed();
        if (!members) {
          embed
            .setTitle(`**Member Counts for ${message.guild?.name}**`)
            .setColor('GREEN')
            .setAuthor(`${client.user?.username}`)
        } else {
          embed
            .setTitle(`**Member Counts for ${message.guild?.name}s**`)
            .setColor('GREEN')
            .setAuthor(`${client.user?.username}`)
        }

        message.channel.send(embed);
      });
  }
});

client.on('guildCreate',  (guild: Discord.Guild) => {
  if (!guild.available) return;

  setStatus(client, client.guilds.cache.size);
  console.log(`Added to \`${guild.name}\` [Owner: \`${guild.owner?.displayName}\`]`);
});

client.on('guildDelete',  (guild: Discord.Guild) => {
  if (!guild.available) return;

  setStatus(client, client.guilds.cache.size);

  console.log(`Removed from \`${guild.name}\` [Owner: \`${guild.owner?.displayName}\`]`);
});

client.on('guildMemberAdd', (_member: Discord.GuildMember | Discord.PartialGuildMember) => {
  setStatus(client, client.guilds.cache.size);
});

client.on('guildMemberRemove', (_member: Discord.GuildMember | Discord.PartialGuildMember) => {
  setStatus(client, client.guilds.cache.size);
});

client.on('invalidated', () => {
  console.error('Process invalidated!');
  process.exit(1);
});

client.login(process.env.DISCORD_API_TOKEN);