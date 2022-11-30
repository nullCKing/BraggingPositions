const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [ GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,],});
const tokenfile = require("./tokenfile.json");
const botconfig = require("./botconfig.json");
const Discord = require("discord.js"); 
const fs = require('fs'); //For JSON file writing

//Discord.js updates commonly change how exactly you define intents and client initialization. If you're getting errors ensure that
//these intent commands are up to date. - 11/29/2022

let readData = fs.readFileSync('storage.json'); 
let readOtherData = fs.readFileSync('sharestorage.json');

//Saves user option positions to a JSON list, for multi-channel support.
function writeToList(storage) {
	var obj = JSON.parse(readData);
	obj['storage'].push({storage});
	jsonStr = JSON.stringify(obj);
	
    fs.writeFile('storage.json', jsonStr, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

//Saves user share positions
//A very unique and original function name, I know..
function writeToOtherList(sharestorage) {
	var obj = JSON.parse(readOtherData);
	obj['sharestorage'].push({sharestorage});
	jsonStr = JSON.stringify(obj);
	
    fs.writeFile('sharestorage.json', jsonStr, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

client.on('ready', async() => {
    console.log("|========================|")
    console.log("|  Bot client is active  |")
    console.log("|========================|")
    
});

client.on("messageCreate", async message => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix;
	let helpTxt = fs.readFileSync('help.txt');
	
	if (cmd === `${prefix}help`) {
		message.channel.send(helpTxt.toString());
	}
	
	if (message.content.startsWith(`${prefix}bto`)){
		let parameters = message.content.split(' ').filter((s) => {
			return s.length > 0 && s != (`${prefix}bto`);
		});
		
		strikedata = parameters[2].toUpperCase();
		validityCheck = true;
		//First checking if the strike price has specified whether the user is purchasing a call or put.
		if (parameters[2]) {
			if (!strikedata.includes('C') && !strikedata.includes('P')) {
				m =
					'<@' +
					message.member.user.id +
					' please specify call or put! >';
				message.channel.send(m);
				validityCheck = false;
			}
		}
		
		//Checking if the date provided is formatted properly. It should contain a slash or dash.
		if (parameters[1]) {
			if (!parameters[1].includes('/')) {
				if (!parameters[1].include('-')){
				validityCheck = false;
				}
			}
		}
		
		if (parameters.length < 4)
		{		
			validityCheck = false;
		}
		
		if (validityCheck == false)
		{
			console.log('User did not properly use this command.');
		}
		
		if (validityCheck) {
			let ticker = ' $' + parameters[0].toUpperCase();
			let exp = parameters[1];
			let strike = parameters[2];
			let quantity = parameters[3] + 'x';
			let user = message.member.user.id;
			m = 'a'; 
			
			//We print a different text output to user depending on whether they bought call or put.
			if (strikedata.includes('C'))
			{			
				m =
					'<@' +
					user +
					'> has opened a new call position: \n' +
					quantity +
					ticker +
					' ' +
					strike +
					', expiring on ' +
					exp + 
					'\n';
			}
			else
			{
				m =
					'<@' +
					user +
					'> has opened a new put position: \n' +
					quantity +
					ticker +
					' ' +
					strike +
					', expiring on ' +
					exp + 
					'\n';
			}
			message.channel.send(m);
			
			//Now performing operations to save user entries to JSON file.
			var mSave = 
			{ 
			  "user" : user,
			  "ticker"  :  ticker, 
			  "expiration"   :  exp, 
			  "strike"      :  strike ,
			  "quantity" : quantity
			}
			
			writeToList(mSave);
		}
	} 
	
	else if (message.content.startsWith(`${prefix}bts`)){
		
		let parameters = message.content.split(' ').filter((s) => {
			return s.length > 0 && s != (`${prefix}bts`);
		});
		
		let validityCheck = true;
		if (parameters[2]) {
			if (!isNumber(parameters[2])) {
				validityCheck = false;
			}
		}
		if (parameters[1]) {
			if (!isNumber(parameters[1])) {
				validityCheck = false;
			}
		}

		if (validityCheck == false)
		{
			console.log('User did not properly use this command.');
		}
		
		if (validityCheck) {
			let ticker = '$' + parameters[0].toUpperCase();
			let price = parameters[1];
			let quantity = parameters[2] + 'x';
			let user = message.member.user.id;
			let m =
				'<@' +
				user +
				'> has bought : \n' +
				quantity +
				' ' +
				ticker +
				' @' +
				price;
			message.channel.send(m);
			var mSave = 
			{ 
			  "user" : user,
			  "ticker"  :  ticker, 
			  "price"   :  price, 
			  "quantity" : quantity
			}
			removeText = ', \n';
			a = mSave.ticker;
			mSave.ticker = a.replace(removeText,"")
			b = mSave.price;
			mSave.price = b.replace(removeText,"")
			c = mSave.quantity;
			mSave.quantity = c.replace(removeText,"")
			writeToOtherList(mSave);
		}
	}
});

function isNumber(input) {
	var RE = /^-{0,1}\d*\.{0,1}\d+$/;
	return RE.test(input);
}

client.login(tokenfile.token);