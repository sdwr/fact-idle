import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { BehaviorSubject} from 'rxjs';
import * as moment from 'moment/moment';

import {environment} from '../environments/environment';

import { UserStateService } from './user-state.service';
import { UserService } from './server/user.service';
import { SpotifyService } from './spotify.service';
import { SongService } from './server/song.service';
import * as Constants from './constants/constants';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

	private chatHistory$: BehaviorSubject<any[]>;
  private songQueue$: BehaviorSubject<any[]>;
  private currentSong$: BehaviorSubject<any>;

  private userList$: BehaviorSubject<any[]>;

  private ws: WebSocketSubject<any>;

  constructor(private userStateService: UserStateService,
  						private userService: UserService,
              private spotifyService: SpotifyService,
              private songService: SongService
  						) {
    this.loadCurrentSong();
  	this.loadChatHistory();
    this.loadSongQueue();
    this.loadUsers();

    this.loadSocket();
  }

  ngOnDestroy() {
    if (this.ws) {
      this.ws.complete();
    }
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

  //for client use
  getAllMessages() {
    return this.chatHistory$;
  }

  getSongQueue() {
    return this.songQueue$;
  }

  getCurrentSong() {
    return this.currentSong$;
  }

  getUserList() {
    return this.userList$;
  }

  sendMessage(message: string) {
    let username = null;
    let user = this.userService.user;
    let timestamp = moment();
    if (user) {
      username = user.name;
    }
    let payload = {name, message, timestamp};
    this.ws.next(this.buildSocketMessage(Constants.CHAT_MESSAGE, payload));
  }

  //socketHandling
  handleMessage(message) {
    let type = message.type;
    let payload = message.payload;

    if (type === Constants.CHAT_MESSAGE) {
      this.addMessage(payload);
    } else if (type === Constants.SONG_PLAYING) {
      this.startSong(payload);
    } else if (type === Constants.PENDING_SONGS) {
      this.updateSongQueue(payload);
    } else if (type === Constants.CHOOSE_SONG) {
      this.chooseSong(payload);
    } else if (type === Constants.VOTE_SONG) {
      this.voteSong(payload);
    } else if (type === Constants.UPDATE_USERS) {
      this.updateUserList(payload);
    }

  }

  handleError(error) {
    console.log("websocket error: " + error);
    this.reopenSocket();
  }

  buildSocketMessage(type, payload) {
    return {type, payload};
  }

  addMessage(message) {
    console.log(message);
    let history = this.chatHistory$.value;
    history.push(message);
    this.chatHistory$.next(history);
  }

  startSong(songObj) {
    console.log(songObj);
    let track = songObj.track;
    let offset_ms = songObj.offset_ms;
    let startTime = songObj.startTime;
    this.currentSong$.next(songObj);
    this.spotifyService.setSong(track, offset_ms);
  }

  updateSongQueue(queue) {
    this.songQueue$.next(queue);
  }

  chooseSong(payload) {
    this.updateSongQueue(payload);
  }

  voteSong(song) {
    let s = song;
    //how is current song going to be stored?
  }

  updateUserList(payload) {
    this.userList$.next(payload);
  }

  //load initial state
  loadCurrentSong() {
    this.currentSong$ = new BehaviorSubject(null);
    this.songService.getSong().subscribe(songObj => {
      console.log("loading current song: " + songObj);
      if (songObj && songObj.track) {
        this.startSong(songObj);
      }
    });
  }

  loadChatHistory() {
  	this.chatHistory$ = new BehaviorSubject([]);
  	this.userService.getChatHistory()
  		.subscribe(history => {
  			console.log("loading chat history: "+ history);
  			this.chatHistory$.next(history as any[]);
  		});
  }

  loadSongQueue() {
    this.songQueue$ = new BehaviorSubject([]);
    this.songService.getSongQueue()
      .subscribe(queue => {
        console.log("loading song queue: " + queue);
        this.songQueue$.next(queue as any[]);
      });
  }

  loadUsers() {
    this.userList$ = new BehaviorSubject([]);
    this.userService.getActiveUsers()
      .subscribe(users => {
        console.log("loading active user list: " + users);
        this.userList$.next(users as any[]);
      });
  }

}
