import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from '../user-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userStateService: UserStateService,
  						private router: Router) { }

  ngOnInit() {
  }

  login(username: string) {
    this.userStateService.tryLoginAs(username);
  	if (this.userStateService.setUser(username)) {
  		this.router.navigate(['/home']);
  	}

  }

}
