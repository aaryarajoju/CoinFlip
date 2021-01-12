const Discord = require('discord.js');
const {prefix, token} = require('./config.json')
const client = new Discord.Client();

var headsCounter = 0;
var tailsCounter = 0;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == Discord.Client.user) return;
    else if (receivedMessage.content.startsWith(prefix)) processCommand(receivedMessage)
    else return;
});


function processCommand(receivedMessage){

    let fullCommand = receivedMessage.content.substr(prefix.length);
    let splitCommand = fullCommand.split(" ");
    let primaryCommand = splitCommand[0];
    let arguments = splitCommand.slice(1);

    if (primaryCommand.toLowerCase() == 'flip') someCommand(receivedMessage, arguments);
    else return;
}

function someCommand(receivedMessage, arguments){
    if (arguments.length > 1) {
        receivedMessage.channel.send('Number of arguements too many');
        return;
    }else if (arguments.length == 0){
        flipOnceCommand(receivedMessage);
    } else if (arguments.length == 1){
        let numOfTimes = arguments[0];
        flipMultipleCommand(receivedMessage, numOfTimes);
    } else {
        receivedMessage.channel.send('ERROR!');
    }
}

function flipOnceCommand(receivedMessage){
    result = randomSelect();
    receivedMessage.channel.send('The result of the flip is  **' + result + "**");
    tailsCounter = headsCounter = 0;
}

function flipMultipleCommand(receivedMessage, numOfTimes){

    for (var i = 1; i <= numOfTimes; i++){
        result = randomSelect();
        receivedMessage.channel.send(i + '.  **' + result + '**');
    }
    receivedMessage.channel.send('number of TAILS:  **' + tailsCounter + '**');
    receivedMessage.channel.send('number of HEADS:  **' + headsCounter + '**');
    tailsCounter = headsCounter = 0;
}

function randomSelect(){
    let randomSelectionNum = Math.floor((Math.random()*2) + 1);

    switch (randomSelectionNum){
        case 1: 
            randomSelection = 'TAILS';
            tailsCounter++;
            break;
        
        case 2:
            randomSelection = 'HEADS';
            headsCounter++;
            break;
    }
    return randomSelection;
}


client.login(token);
