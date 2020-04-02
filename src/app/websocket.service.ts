import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import * as moment from 'moment/moment';

import {environment} from '../environments/environment';

import { UserStateService } from './user-state.service';
import { UserServerService } from './user-server.service';
import { SpotifyService } from './spotify.service';
import { SongServerService } from './song-server.service';
import * as Constants from './constants/constants';
import {DataStreamService} from "./data-stream.service";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private ws: WebSocketSubject<any>;

  constructor(private userStateService: UserStateService,
  						private userServerService: UserServerService,
              private spotifyService: SpotifyService,
              private songServerService: SongServerService,
              private dataStreamService: DataStreamService
  						) {
    this.loadCurrentSong();
  	this.loadChatHistory();
    this.loadSongQueue();
    this.loadUsers();
    this.loadSocket();
  }

  ngOnDestroy() {
  	this.ws.complete();
  }

  loadSocket() {
    this.ws = webSocket({url: environment.webSocket});
    this.ws.subscribe(message => this.handleMessage(message),
      error => this.handleError(error),
      () => this.reopenSocket());
  }

  reopenSocket() {
    this.loadSocket();
  }

  sendChatMessage(message: string) {
    this.sendMessage(Constants.CHAT_MESSAGE, message);
  }

  sendChangeUsernameMessage(username: string) {
    this.sendMessage(Constants.CHANGE_USERNAME, username);
  }

  sendMessage(type: string, message: string) {
    let timestamp = moment();
    let payload = {user: this.userStateService.getUser(), message: message, timestamp};
    this.ws.next(this.buildSocketMessage(type, payload));
  }

  //socketHandling
  handleMessage(message) {
    let type = message.type;
    let payload = message.payload;

    if (type === Constants.CHAT_MESSAGE) {
      //{user: User, message: string}
      this.dataStreamService.addMessage(payload);
    } else if (type === Constants.SONG_PLAYING) {
      this.startSong(payload);
    } else if (type === Constants.PENDING_SONGS) {
      this.dataStreamService.setSongQueue(payload);
    } else if (type === Constants.UPDATE_USERS) {
      this.updateUserList(payload);
    } else if (type === Constants.GET_SELF) {
      this.userStateService.setUser(payload)
    }

  }

  handleError(error) {
    console.log("websocket error: " + error);
    this.reopenSocket();
  }

  buildSocketMessage(type, payload) {
    return {type, payload};
  }

  startSong(songObj) {
    let track = songObj.track;
    let offset_ms = songObj.offset_ms;
    let startTime = songObj.startTime;
    this.dataStreamService.setCurrentSong(songObj);
    this.spotifyService.setSong(track, offset_ms);
  }

  chooseSong(payload) {
    this.dataStreamService.setSongQueue(payload);
  }

  updateUserList(payload) {
    console.log("user list is now:", payload);
    this.dataStreamService.setUserList(payload);
  }

  //load initial state
  loadCurrentSong() {
    this.songServerService.getSong().subscribe(songObj => {
      console.log("loading current song: " + songObj);
      if (songObj && songObj.track) {
        this.startSong(songObj);
      }
    });
  }

  loadChatHistory() {
  	this.userServerService.getChatHistory()
  		.subscribe(history => {
  			console.log("loading chat history: "+ history);
  			this.dataStreamService.setChatHistory(history as any[]);
  		});
  }

  loadSongQueue() {
    this.songServerService.getSongQueue()
      .subscribe(queue => {
        console.log("loading song queue: " + queue);
        this.dataStreamService.setSongQueue(queue as any[]);
      });
  }

  loadUsers() {
    this.userServerService.getActiveUsers()
      .subscribe(users => {
        console.log("loading active user list: " + users);
        this.dataStreamService.setUserList(users as any[]);
      });
  }

}
