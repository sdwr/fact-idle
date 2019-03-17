const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const server = http.createServer(app);

const wss = new WebSocket.Server({server});

//setup extra functions
//---------------------
let nextId = 1;
let users = [];

function genUserId() {
	let id = nextId;
	nextId++;
	return id;
}

function createUser(username) {
	if(!username || typeof(username) != "string") {
		return null;
	}
	if(users.find(user => user.username === username)) {
		return null;
	}
	let newUser = {username: username, userId: genUserId()};
	users.push(newUser);
	return newUser;
}

//setup http endpoints
//---------------------

app.get('/users/:username', urlencodedParser, function getUser (req, res) {
	let username = req.params.username;
	let user = users.find(user => username === user.username);
	if (user) {
		res.send(user);
		console.log(`returning existing user: ${JSON.stringify(user)}`);
	} else {
		let newUser = createUser(username);
		if(!newUser) {
			res.status(500).send(`Could not create user: ${JSON.stringify(sentUser)}`);
		} else {
			res.send(newUser);
			console.log(`returning new User: ${JSON.stringify(newUser)}`);
		}
	}
});


app.post('/users', jsonParser, function postUser(req, res) {
	let sentUser = req.body;
	if (!sentUser.username) {
		res.status(400).send(`Must include username to create`);
	} else {
		let newUser = createUser(sentUser.username);
		if(!newUser) {
			res.status(500).send(`Could not create user: ${JSON.stringify(sentUser)}`);
		} else {
			res.send(newUser);
		}
	}
});



//setup websockets
//------------------------

let usersConnected = 0;
let messages = [];
//user object = {username: string}

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