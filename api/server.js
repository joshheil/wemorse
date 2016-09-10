var express = require('express');
var app = express();
var fs = require("fs");
var morse = require('morse');
var sleep = require('sleep');
var Wemo = require('wemo-client');

var wemo;
var client;
var i = 0;
var message = '';

function start(incomingMessage) {
  message = incomingMessage;
  message = morse.encode(message);
  wemo = new Wemo();
  wemo.load('***Your wemo device ip***', main); //typically http://192.168.0.155:49153/setup.xml
  
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
  client.setBinaryState(1, dashOff);
}

function dotOn(err, response) {
  client.setBinaryState(1, dotOff);
}


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/:message', function (req, res) {
  res.end(start(req.params.message));
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})