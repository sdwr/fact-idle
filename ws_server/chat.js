const WebSocket = require('ws');

const wss = new WebSocket.Server({
	port: 8080
});


let usersConnected = 0;
let messages = [];

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