var childProcess = require('child_process');

var config = JSON.parse(require('fs').readFileSync('./config/'+(process.argv[2] ? process.argv[2] : 'default')+'.json'));

var i = 0;
var interval = setInterval(function(){
    var bot = config[i];
    console.log('Starting bot '+ bot.id);
    childProcess.fork('./node_modules/NeuroChainBot/server.js', [bot.id, bot.listeningPort, bot.sendingPort, bot.seed.host, bot.seed.port, bot.connectorUDPPort, bot.websocketPort, bot.dbSync == true]);
    if(++i === config.length) clearInterval(interval);
}, 2000);
