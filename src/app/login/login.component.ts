import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from '../user-state.service';

import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userStateService: UserStateService,
  						private router: Router) { }

  ngOnInit() {
    console.log(environment);
  }

  login(username: string) {
    this.userStateService.tryLoginAs(username);
    setTimeout(() => this.router.navigate(['/home']), 1000);
  }

}
