# Discord Server Member Counter
This is a Discord Bot that more or less does what it says on the tin.

It currently returns the:
* `total member count`
* `bot member count`
* `adjusted member count`

and modifies the status based on how many servers it is in, and how many people are in them.

### Install & Setup
#### Prerequisites
To run this bot, you must have the following installed on your system:
* [**Node.JS 12.5.3 or higher**](https://nodejs.org/)
#### Download
* First, clone the repository by running:
```bash
git clone https://github.com/OliverCordingl1/discord-member-counter.git
cd ./discord-member-counter
```
* If you intend to play around with the code, run
```bash
npm i
```
otherwise run
```bash
npm i --only=prod
```

* Now, create a file called `.env` in the root project directory, and write the following:

  ```
  DISCORD_API_TOKEN="<YOUR API TOKEN (NEVER SHARE THIS!)>"
  ```

  (Your `DISCORD_API_TOKEN` can be created by creating a new bot application in the [Discord Developer Dashboard](https://discordapp.com/developers/applications))

* Finally, you can start the bot with

  ```bash
  npm run start
  ```

If you have any questions, please don't hesitate to ask them in an issue, just make sure you do your own research first 😄