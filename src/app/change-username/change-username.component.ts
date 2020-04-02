import { Component, OnInit } from '@angular/core';

import {environment} from '../../environments/environment';
import {WebSocketService} from "../websocket.service";

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.scss']
})
export class ChangeUsernameComponent implements OnInit {

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {
    console.log(environment);
  }

  login(username: string) {
    this.webSocketService.sendChangeUsernameMessage(username);
  }

}
