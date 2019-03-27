import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable} from 'rxjs';
import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss']
})
export class ChatPanelComponent implements OnInit {

	chatHistory$: Observable<any>;
  chatInput = new FormControl('');

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {
  	this.chatHistory$ = this.webSocketService.getAllMessages();
    this.chatHistory$.subscribe(chat => this.scrollToBottom());
  }

  sendMessage(message: string) {
  	this.webSocketService.sendMessage(message);
    this.chatInput.setValue('');
  }

  scrollToBottom() {
    //make this work
  }

}
