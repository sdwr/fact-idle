const moment = require("moment");

var currentSong = null;
var endTime = null;
var nextSongs = [];

function pickCurrentSongFromList() {
	let songItem = {id: null, score: -100};
	nextSongs.forEach(x => x.score > songItem.score ? songItem = x : null);
	nextSongs = [];
	if (songItem.id) {
		setCurrentSong(songItem.id, songItem.duration_ms);
	} else {
		currentSong = null;
	}
}

function setCurrentSong(id, duration_ms) {
	currentSong = id;
	endTime = moment().add(duration_ms, 'ms');
	setTimeout(pickCurrentSongFromList, duration_ms);
}

function putSong(id, duration_ms) {
	if (currentSong === null) {
		setCurrentSong(id, duration_ms);
	} else {
		if (!nextSongs.find(x => x.id === id)) {
			nextSongs.push({id: id, duration_ms:duration_ms, score: 0});
		}
	}
}

function getSong() {
	return {currentSong: currentSong};
}

function getNext() {
	return {nextSongs: nextSongs};
}

function voteSong(id, vote) {
	let songItem = nextSongs.find(x => x.id === id);
	songItem ? songItem.score += vote : null;
	return {nextSongs: nextSongs};
}


module.exports = (req, res) => {
	let params = req.params;
	if (!params || params.length === 0) {
		res.send('error no params');
	} else {
		let action = params[0];
		if (action === "put") {
			res.send(putSong(params[1], parseInt(params[2])));
		} else if (action === "get") {
			res.send(getSong());
		} else if (action === "getNext") {
			res.send(getNext());
		} else if (action === "vote") {
			res.send(voteSong(params[1], parseInt(params[2]) ));
		}
	}

}