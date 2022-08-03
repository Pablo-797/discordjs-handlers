# DiscordJS-Handlers 
##### *New Discord.JS v14 handlers in just one line!*
##### 🙋‍♂ ~ Contact me on Discord: **_Pablo#7777**
---
&nbsp;
## ✅ Installation
```
npm i discordhandlers
```
&nbsp;
## 📌 Event Handler
### Event Handler: `DiscordJSHandlers.events(folder, client)`
#### Show parameter is optional, and it make console.log loaded events or not.
#### Example:
```js
const {Client, IntentsBitField} = require("discord.js"); 
const DiscordJSHandlers = require("discordhandlers"); 
const {TOKEN} = require("./config.json"); 
const client = new Client({intents: new IntentsBitField(["Guilds","GuildMessages"])}); 
DiscordJSHandlers.events("events", client); // where "events" is events folder name

client.login(TOKEN); // TOKEN is bot access token gained from discord developers portal
```
#### Examples of events:
```js
// ready Event
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) { // execute() is where you will pass the rest of needed arguments.
        console.log(`The bot is now online!`);
    },
};
```
```js
// messageCreate Event
module.exports = {
	name: 'messageCreate',
	async execute(message, client) {
        console.log(`Message has been sent! Content: ${message.content}.`);
	},
};
```
### Events parameters
#### Required:
 * `name` - name of the event
 * `execute()` - function to execute when event is called
#### Optional:
 * `once` - true/false, if event can be called only once.
&nbsp;
## 📌 Command Handler
### Command Handler: `DiscordJSHandlers.commands(folder, client, token)`
#### Bot token is used to pull slash commands through Discord Rest API.
#### Show parameter is optional, and it make console.log loaded commands or not.
#### Example:
```js
const {Client, IntentsBitField} = require("discord.js"); 
const DiscordJSHandlers = require("discordhandlers"); 
const client = new Client({intents: new IntentsBitField(["Guilds","GuildMessages"])}); 
DiscordJSHandlers.commands("commands", client, 'BOT TOKEN HERE'); // where "commands" is events folder name

client.login('BOT TOKEN HERE'); // TOKEN is bot access token gained from discord developers portal
```
#### Example of command:
```js
// Ping Command
module.exports = {
	name: 'ping',
	async execute(interaction, client) {
		interaction.reply({content: `**Pong:**\n> Bot: \`${sentMessage.createdTimestamp - message.createdTimestamp}ms\``})
	},
};
```
### Commands parameters
#### Required:
 * `name` - name of the command
 * `description` - description of command
 * `execute()` - function to execute when event is called
#### Optional:
 * `permission` - permission, which interaction user must have.
&nbsp;
## 📌 Button Handler
### Button Handler: `DiscordJSHandlers.buttons(folder, client, show)`
#### Show parameter is optional, and it make console.log loaded buttons or not.
#### Example:
```js
const {Client, IntentsBitField} = require("discord.js"); 
const DiscordJSHandlers = require("discordhandlers"); 
const {TOKEN} = require("./config.json"); 
const client = new Client({intents: new IntentsBitField(["Guilds","GuildMessages"])}); 
DiscordJSHandlers.events("buttons", client); // where "buttons" is buttons folder name

client.login(TOKEN); // TOKEN is bot access token gained from discord developers portal
```
#### Example of button:
```js
module.exports = {
    id: 'verification',
    async execute(interaction, client) { // execute() is where you will pass the rest of needed arguments.
        interaction.reply("Button clicked").
	// do more stuff
    },
};
```
### Buttons parameters
#### Required:
 * `id` - id of the button
 * `execute()` - function to execute when event is called
#### Optional:
 * `permission` - sets a permission which interaction user must have
 * `ownerOnly` - only discord server owner can execute this button
&nbsp;
## 💡 Example
```js
const DiscordJSHandlers = require('discordhandlers'); //Requiring Discord-Handlers module.
const {Client, IntentsBitField} = require('discord.js'); //Requiring Discord.js module.
const client = new Client({intents: new IntentsBitField(["Guilds", "GuildMessages"])}); //Creating new Discord.JS Client instance.

DiscordHandlers.events("events", client); //Running the event handler, where "events" is events folder name.
DiscordHandlers.commands("commands", client, 'BOT TOKEN HERE'); //Running the command handler, where "commands" is commands folder name.

client.login('BOT TOKEN HERE');
```
&nbsp;
## 📝 Features

- Command Handler in just one line.
- Event Handler in just one line.
- Button Handler in just one line.
- Discord.JS v14 Support
