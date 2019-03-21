import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/websocket';
import { BehaviorSubject} from 'rxjs';
import * as moment from 'moment/moment';

import { UserStateService } from './user-state.service';
import { UserServerService } from './user-server.service';
import { SpotifyService } from './spotify.service';
import { SongServerService } from './song-server.service';
import * as Constants from './constants/constants';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

	private chatHistory$: BehaviorSubject<any[]>;
  private songQueue$: BehaviorSubject<any[]>;

  private syncSongToServer: boolean;
  private currentSong: any;

  private ws: WebSocketSubject<any>;

  constructor(private userStateService: UserStateService,
  						private userServerService: UserServerService,
              private spotifyService: SpotifyService,
              private songServerService: SongServerService
  						) {
    this.syncSongToServer = true;
    this.loadCurrentSong();
  	this.loadChatHistory();
    this.loadSongQueue();
  	this.ws = webSocket({url: "ws:localhost:8080"});
  	this.ws.subscribe(message => this.handleMessage(message));
  }

  ngOnDestroy() {
  	this.ws.complete();
  }

  //for client use
  getAllMessages() {
    return this.chatHistory$;
  }

  getSongQueue() {
    return this.songQueue$;
  }

  getCurrentSong() {
    return this.currentSong;
  }

  sendMessage(message: string) {
    let username = null;
    let user = this.userStateService.getUser();
    let timestamp = moment();
    if (user) {
      username = user.username;
    }
    let payload = {username, message, timestamp};
    this.ws.next(this.buildSocketMessage(Constants.CHAT_MESSAGE, payload));
  }

  setSyncSongToServer(sync: boolean) {
    this.syncSongToServer = sync;
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
    }

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

  startSong(song) {
    if (this.syncSongToServer) {
      this.spotifyService.setSong(song, 0);
    }
  }

  updateSongQueue(queue) {
    this.songQueue$.next(queue);
  }

  chooseSong(song) {
    let queue = this.songQueue$.value;
    //find same song in queue, add vote
    //gotta lock down song dto
  }

  voteSong(song) {
    let s = song;
    //how is current song going to be stored?
  }

  //load initial state
  loadCurrentSong() {
    if(this.syncSongToServer) {
      let song = this.songServerService.getSong();
    }
  }

  loadChatHistory() {
  	this.chatHistory$ = new BehaviorSubject([]);
  	this.userServerService.getChatHistory()
  		.subscribe(history => {
  			console.log("loading chat history: "+ history);
  			this.chatHistory$.next(history as any[]);
  		});
  }

  loadSongQueue() {
    this.songQueue$ = new BehaviorSubject([]);
    this.songServerService.getSongQueue()
      .subscribe(queue => {
        console.log("loading song queue: " + queue);
        this.songQueue$.next(queue as any[]);
      });
  }

}
