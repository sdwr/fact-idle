import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  readonly chatPath = environment.serverUrl + "/chat";

  constructor(private http: HttpClient) { }

  getHistory(roomId: string) {
  	return this.http.get(this.chatPath + '/' + roomId);
  }

  addMessage(roomId: string, userId: string, message: string) {
  	let body = new HttpParams()
  		.set('roomId', roomId)
  		.set('userId', userId)
  		.set('message', message);
  	let config = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
  	return this.http.post(this.chatPath, body, config);
  }

}
