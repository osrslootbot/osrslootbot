var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname,'output.txt');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
setInterval(readOutput,5000);
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
function readOutput() {
	var fileStats = fs.statSync(filePath);
	var fileSize = fileStats.size;
	if(fileSize > 0) {
		fs.readFile(filePath, function(err,data) {
			if(!err) {
				let entry = JSON.parse(data);
				bot.sendMessage({
				to: '355459010549514241',
				message: entry.message
				});
			}
			else {
				console.log(err);
			}
		});
		fs.writeFile(filePath,'', (err)=> {
			if(err) throw err;
		});
	}
};