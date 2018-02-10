var childProcess = require('child_process');

var config = JSON.parse(require('fs').readFileSync('./config/'+(process.argv[2] ? process.argv[2] : 'default')+'.json'));

config.forEach(
  (bot) => {
    childProcess.fork('./node_modules/NeuroChainBot/server.js', [bot.id, bot.listeningPort, bot.sendingPort, bot.seed.host, bot.seed.port, bot.connectorUDPPort, bot.websocketPort]);
  }
);
