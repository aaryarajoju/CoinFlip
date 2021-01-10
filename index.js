const Discord = require('discord.js');
const {prefix, token} = require('./config.json')
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == Discord.Client.user) return;

    if (receivedMessage.content.startsWith(prefix)) {
        processCommand(receivedMessage)
    }
});

function processCommand(receivedMessage){
    let fullCommand = receivedMessage.content.substr(prefix.length);
    let splitCommand = fullCommand.split(" ");
    let primaryCommand = splitCommand[0];
    let arguements = splitCommand.slice(1);

    if (primaryCommand.toLowerCase() == 'ht'){
        headsOrTalesCommand(receivedMessage, arguements);
    } 
}

function headsOrTalesCommand(receivedMessage, arguements){

    let userSelection = arguements[0].toLowerCase()
    let result = randomSelect();

    receivedMessage.channel.send('The result of a coin flip is ' + result);

    if (result = userSelection){
        receivedMessage.channel.send('Congratulations! You\'ve won');
    } else {
        receivedMessage.channel.send('Sorry, you didn\'t win');
    }
}

function randomSelect(){
    let randomSelectionNum = Math.floot((Math.random()*2) + 1);

    switch (randomSelectionNum){
        case 1: 
            randomSelection = 'Tails';
            break;
        
        case 2:
            randomSelection = 'Heads';
            break;
    }
    return randomSelection;
}


client.login(token);
