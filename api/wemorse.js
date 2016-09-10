var wemorse = ( function(){

var morse = require('morse');
var sleep = require('sleep');
var Wemo = require('wemo-client');

var wemo; 
var client;
var i = 0;
var message = '';

return {
    start: function(incomingMessage){   
        start(incomingMessage);
    }
};

function start(incomingMessage)
{
    console.log('start');
    message = incomingMessage;
     message = morse.encode(message);
     wemo = new Wemo();
    wemo.load('http://192.168.1.163:49153/setup.xml', main); //Family Room Lamp
    // wemo.load('http://192.168.1.177:49153/setup.xml', main); //Hall Lamp
    // wemo.load('http://192.168.1.178:49153/setup.xml', main), 30000); //Garage Lights
    // wemo.load('http://192.168.1.179:49153/setup.xml', main); //Front Porch
}

function main(deviceInfo) {
  client = wemo.client(deviceInfo);

  dotOrDash(message[i] === '-' ? dashOn : dotOn);
}

function dotOrDash(callback) {
  setTimeout(function () {
    if (i >= message.length) {
      return;
    }

    if (message[i] !== ' ') {
      callback();
    }

    i++;
    dotOrDash(message[i] === '-' ? dashOn : dotOn)

  }, 2000)

}

function wait(delayTime) {
  sleep.usleep(delayTime);
  client.setBinaryState(0);
}

function dashOff(err, response) {
  sleep.sleep(1);
  client.setBinaryState(0);
}

function dotOff(err, response) {
  sleep.usleep(500);
  client.setBinaryState(0);
}

function dashOn(err, response) {
  client.setBinaryState(1, dashOff );
}

function dotOn(err, response) {
  client.setBinaryState(1, dotOff);
}


})();