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
let userStates = {};

function findUser(username) {
	return users.find(u => u.username === username);
}

function findUserState(username) {
	return userStates[username];
}

function genUserId() {
	let id = nextId;
	nextId++;
	return id;
}

function createUser(username) {
	if(!username || typeof(username) != "string") {
		return null;
	}
	if(findUser(username)) {
		return null;
	}
	let newUser = {username: username, userId: genUserId()};
	users.push(newUser);
	userStates[username] = {};
	return newUser;
}

//setup http endpoints
//---------------------

app.get('/users/:username', urlencodedParser, function getUser (req, res) {
	let username = req.params.username;
	let user = findUser(username);
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
	let sentUser = req.body.state;
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


app.get('/users/:username/state', urlencodedParser, function getUserState(req, res) {
	let username = req.params.username;
	let user = findUser(username);
	if (user) {
		res.send(findUserState(username));
	} else {
		res.status(400).send(`User ${username} does not exist`);
	}
});

app.post('/users/:username/state', jsonParser, function setUserState(req, res) {
	let sentState = req.body;
	let username = req.params.username;
	let user = findUser(username);
	if (user) {
		userStates[username] = sentState;
		res.send(sentState);
	} else {
		res.status(500).send(`User ${username} does not exist`);
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