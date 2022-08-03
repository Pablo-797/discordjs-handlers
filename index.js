const { Collection, Routes, EmbedBuilder } = require("discord.js");
const { REST } = require("@discordjs/rest")
const fs = require("fs");

module.exports = {
    events: async (path, client, show) => {
        const LoadedEvents = [];
        const eventFiles = fs.readdirSync(path).filter(file => file.endsWith(".js"));
        for(const file of eventFiles) {
            const event = require(`../../${path}/${file}`);
            if(!event.name || !event.execute) return;
            if(event.once) client.once(event.name, (...args) => event.execute(...args, client))
            else client.on(event.name, (...args) => event.execute(...args, client));
            LoadedEvents.push(event.name);
        };
        if (show) console.log(`Loaded events: ${LoadedEvents}`);
    },
    commands: async(path, client, token, show) => {
        const LoadedCommands = [];
        const CommandsArray = [];
        client.commands = new Collection();
        const commandFiles = fs.readdirSync(path).filter(file => file.endsWith(".js"));
        for(const file of commandFiles) {
            const command = require(`../../${path}/${file}`);
            if(!command.name || !command.description || !command.execute) return;
            if(command.permission) command.defaultPermission = false;
            client.commands.set(command.name, command);
            CommandsArray.push(command);
            LoadedCommands.push(command.name);
        };
        if(!token) return CommandsArray;
        client.on("ready", async () => {
            const CLIENT_ID = client.user.id;
            const rest = new REST({version: "10"}).setToken(token);
            try {
                await rest.put(Routes.applicationCommands(CLIENT_ID), {body: CommandsArray});
            } catch(err) {
                if(err) console.error(err);
            }
        });
        client.on("interactionCreate", async (interaction) => {
            if(!interaction.isCommand() && !interaction.isContextMenuCommand()) return;
            const command = client.commands.get(interaction.commandName);
            if(!command) return interaction.reply({content: "An error occured"}) && client.commands.delete(interaction.commandName);
            if(command.permission) {
                if(!interaction.member.permissions.has(command.permission))
                return interaction.reply({embeds: [new EmbedBuilder()
                    .setColor("RED")
                    .setDescription("You don't have permissions to use this command.")], ephemeral: true})
            };
            await command.execute(interaction, client);
        });
        if(show) console.log(LoadedCommands);
    },
    buttons: async(path, client, show) => {
        const LoadedButtons = [];
        client.buttons = new Collection();
        const buttonFiles = fs.readdirSync(path).filter(file => file.endsWith(".js"));
        for(const file of buttonFiles) {
            const button = require(`../../${path}/${file}`);
            if(!button.id || !button.execute) return;
            client.buttons.set(button.id, button);
            LoadedButtons.push(button.id);
        };
        client.on("interactionCreate", async (interaction) => {
            if(!interaction.isButton()) return;
            const button = client.buttons.get(interaction.customId);
            if(!button) return;
            if(button.permission && !interaction.member.permissions.has(button.permission)) 
                return interaction.reply({embeds: [new EmbedBuilder().setColor("Red").setDescription("You don't have permission to use this button!")], ephemeral: true});
            if(button.ownerOnly && interaction.member.id !== interaction.guild.ownerId) 
                return interaction.reply({embeds: [new EmbedBuilder().setColor("Red").setDescription("You don't have permission to use this button (only for server owners)")], ephemeral: true})
            
            await button.execute(interaction, client);
        });
        if(show) console.log(LoadedButtons);
    }
};