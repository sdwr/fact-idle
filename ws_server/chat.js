const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');
const moment = require('moment');

const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const server = http.createServer(app);

const wss = new WebSocket.Server({server});


const CHAT_MESSAGE = 'chatMessage';
const PENDING_SONGS = 'pendingSongs';
const SONG_PLAYING = 'songPlaying';
const VOTE_SONG = 'voteSong';
const CHOOSE_SONG = 'chooseSong';

//setup extra functions
//---------------------
let noop = function () {};
let sockets = null;

//user data
let nextId = 1;
let users = [];
let userStates = {};

let usersConnected = 0;
let messages = [];

//song data

let currentSong = null;
let startTime = null;
let pendingSongs = [];


// user functions

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

//song functions

function pickNewSong() {
	if(pendingSongs.length > 0) {
		let newSongObj = removePendingSong();
		setCurrentSong(newSongObj.track);
	} else {
		currentSong = null;
		startTime = 0;
	}
}

function addPendingSong(track) {
	if (!pendingSongs.find(s => s.track.id === track.id) && pendingSongs.length < 10) {
		pendingSongs.push({track, chosenBy: [], score: 0});
		sendSocketMessage(PENDING_SONGS, pendingSongs);
	}
}

function removePendingSong() {
		let newSong = pendingSongs[0];
		pendingSongs = pendingSongs.slice(1);
		sendSocketMessage(PENDING_SONGS, pendingSongs);
		return newSong;
}

function sortPending() {
	pendingSongs.sort((a,b) => b.score - a.score);
}

function setCurrentSong(track, user) {
	currentSong = track;
	startTime = moment();
	setTimeout(pickNewSong, track.duration_ms);

	let offset_seconds = 0;
	if (startTime) {
		offset_seconds = moment().diff(startTime, 'seconds');
	}
	sendSocketMessage(SONG_PLAYING, {track: currentSong, offset_ms: offset_seconds * 1000, startTime});
}

function addSongToQueue(track, user) {
	if (currentSong === null) {
		setCurrentSong(track, user);
	} else {
		addPendingSong(track);
	}
}

function chooseSong(track, user) {
	let songObj = pendingSongs.find(s => s.track.id === track.id);
	if (songObj && !songObj.chosenBy.find(u => u.userId === user.userId)) {
		songObj.chosenBy.push(user);
		songObj.score++;
		sortPending();
		sendSocketMessage(CHOOSE_SONG, pendingSongs);
	}
	return pendingSongs;
}

function unChooseSong(track, user) {
	let songObj = pendingSongs.find(s => s.track.id === track.id);
	if (songObj && songObj.chosenBy.find(u => u.userId === user.userId)) {
		let userIndex = songObj.chosenBy.findIndex(u => u.userId === user.userId);
		songObj.chosenBy.splice(userIndex, 1);
		songObj.score--;
		sortPending();
		sendSocketMessage(CHOOSE_SONG, pendingSongs);
	}
	return pendingSongs;
}

function voteSong(track, user, vote) {

}

//setup websockets
//------------------------
//user object = {username: string, userId: number}
//websocket message object = {type: string, payload: variable}
//CHAT_MESSAGE payload = string
//

function sendSocketMessage(type, payload) {
	wss.clients.forEach((client) => client.send(JSON.stringify({type:type, payload:payload}), noop));
	console.log('sent: %s', type);
}

function readChatMessage(message) {
	messages.push(message);
}

function handleSocketMessage(socketMessage) {
	console.log('received: %s', JSON.stringify(socketMessage));

	let type = socketMessage["type"];
	let payload = socketMessage.payload;

	if (type == CHAT_MESSAGE) {
		readChatMessage(payload);
		sendSocketMessage(CHAT_MESSAGE, payload);
	}
}

wss.on('connection', function connections(ws) {
	usersConnected++;
	console.log('%d users connected', usersConnected);

	ws.on('message', function incoming(message) {
		handleSocketMessage(JSON.parse(message));
	});

	ws.on('close', function disconnect(ws) {
		usersConnected--;
		console.log('disconnected: %s', ws);
		console.log('%d users connected', usersConnected);
	});
});

//setup http endpoints
//---------------------

// /users

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

// /chatHistory

app.get('/chatHistory', urlencodedParser, function getChatHistory(req, res) {
	res.send(messages);
	console.log(`sent message history`);
});

// /song


app.get('/song/current', urlencodedParser, function (req, res) {
	let offset_seconds = 0;
	if (startTime) {
		offset_seconds = moment().diff(startTime, 'seconds');
	}
	if (currentSong) {
		res.send({track: currentSong, offset_ms: offset_seconds * 1000, startTime});
		console.log(`sent current song ${currentSong}`);
	} else {
		res.send(null);
	}
});

app.get('/song/pending', urlencodedParser, function (req, res) {
	res.send(pendingSongs);
});

app.post('/song/add', jsonParser, function (req, res) {
	let track = req.body.track;
	let user = req.body.user;

	addSongToQueue(track, user);
	res.send(pendingSongs);

	console.log(`added song ${track.name} by ${user.username} to queue`);
});

app.post('/song/choose', jsonParser, function (req, res) {
	let track = req.body.track;
	let user = req.body.user;

	chooseSong(track, user);
	res.send(pendingSongs);

	console.log(`user ${user.username} chose ${track.name} from the queue`);
});

app.post('/song/choose/unchoose', jsonParser, function (req, res) {
	let track = req.body.track;
	let user = req.body.user;

	unChooseSong(track, user);
	res.send(pendingSongs);

	console.log(`user ${user.username} unchose ${track.name} from the queue`);
});

app.post('/song/vote', jsonParser, function (req, res) {
	let track = req.body.track;
	let user = req.body.user;
	let vote = req.body.vote;

	voteSong(track, user, vote);
	res.send(pendingSongs);

	console.log(`user ${user.username} voted ${vote} on ${track.name}`);
});

//run server
server.listen(8080, function init() {
	console.log(`server started on port ${server.address().port}`);
});