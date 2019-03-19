import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/websocket';
import { BehaviorSubject} from 'rxjs';
import * as moment from 'moment/moment';

import { UserStateService } from './user-state.service';
import { UserServerService } from './user-server.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

	ws: WebSocketSubject<any>;

	chatHistory: BehaviorSubject<any[]>;

  constructor(private userStateService: UserStateService,
  						private userServerService: UserServerService
  						) {
  	this.getChatHistory();
  	this.ws = webSocket({url: "ws:localhost:8080"});
  	this.ws.subscribe(message => this.addMessage(message));
  }

  ngOnDestroy() {
  	this.ws.complete();
  }

  getChatHistory() {
  	this.chatHistory = new BehaviorSubject([]);
  	this.userServerService.getChatHistory()
  		.subscribe(history => {
  			console.log(history);
  			this.chatHistory.next(history as any[]);
  		});
  }

  addMessage(message) {
  	let history = this.chatHistory.value;
  	history.push(message);
  	this.chatHistory.next(history);
  }

  getAllMessages() {
  	return this.chatHistory;
  }

  sendMessage(message: string) {
  	let username = null;
  	let user = this.userStateService.getUser();
  	let timestamp = moment();
  	if (user) {
  		username = user.username;
  	}
  	this.ws.next({username, message, timestamp});
  }

}
