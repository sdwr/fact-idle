import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-users-online',
  templateUrl: './users-online.component.html',
  styleUrls: ['./users-online.component.scss']
})
export class UsersOnlineComponent implements OnInit {

	userList$: BehaviorSubject<any[]>;

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {
  	this.userList$ = this.webSocketService.getUserList();
  }

}
