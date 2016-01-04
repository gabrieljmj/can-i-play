var http = require('http'),
  exec = require('child_process').exec,
  util = require('util'),
  canIPlay = false;

function run () {
  http.get('http://192.168.1.1/padrao', function (res) {
    var body = '';

    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function () {
      function isConnected() {
        return /Usuario-PC/g.exec(body);
      }

      if (!isConnected()) {
        if (!canIPlay) {
          exec('start yeah.wav', function () {
            console.log('VAI JOGAR SEU PORRA!');
          });

          canIPlay = true;
        }
      } else {
        if (canIPlay) {
          exec('start no.mp3', function () {
            console.log('ELE CHEGOU!');
          });

          canIPlay = false;
        }
      }
    });
  });
}

run();

setInterval(run, 5000);