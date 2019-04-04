import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../server/user.service';

import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
  						private router: Router) { }

  ngOnInit() {
    console.log(environment);
  }

  login(username: string) {
    this.userService.loginFlow(username);
    setTimeout(() => this.checkRoom, 2000);
  }

  checkRoom() {
    let user = this.userService.user;
    if(user && user.roomId) {
      this.router.navigate(['/home']);
    } else if (user) {
      this.router.navigate(['/rooms']);
    }
  }

}
