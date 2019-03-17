import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss']
})
export class ChatPanelComponent implements OnInit {

	chatHistory$: Observable<any>;

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {
  	this.chatHistory$ = this.webSocketService.getAllMessages();
  }

  sendMessage(message: string) {
  	this.webSocketService.sendMessage(message);
  }

}