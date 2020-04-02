import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {environment} from '../../environments/environment';
import {WebSocketService} from "../websocket.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private webSocketService: WebSocketService,
  						private router: Router) { }

  ngOnInit() {
    console.log(environment);
  }

  login(username: string) {
    this.webSocketService.sendChangeUsernameMessage(username);
    setTimeout(() => this.router.navigate(['/home']), 1000);
  }

}
