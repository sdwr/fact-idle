const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({server});



let usersConnected = 0;
let messages = [];
//user object = {username: string}
let users = [];

wss.on('connection', function connections(ws) {
	usersConnected++;
	console.log('connected: %s', ws);
	console.log('%d users connected', usersConnected);

	ws.on('message', function incoming(message) {
		console.log('received: %s', message);
		messages.push(message);

		ws.send(JSON.stringify(messages));
		console.log('sent %s', messages.toString());
	});

	ws.on('disconnect', function disconnect(ws) {
		usersConnected--;
		console.log('disconnected: %s', ws);
		console.log('%d users connected', usersConnected);
	});
});

server.listen(8080, function init() {
	console.log(`server started on port ${server.address().port}`);
});