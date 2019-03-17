import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/websocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

	ws: WebSocketSubject<any>;

  constructor() { 
  	this.ws = webSocket({url: "ws:localhost:8080"});
  	this.ws.subscribe(x => {});
  }

  ngOnDestroy() {
  	this.ws.complete();
  }

  getAllMessages() {
  	return this.ws;
  }

  sendMessage(message: string) {
  	this.ws.next(message);
  }

}
