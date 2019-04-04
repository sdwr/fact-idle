import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from '../server/user.service';
import { UserStateService } from '../user-state.service';

import {User} from '../dtos/user';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.scss']
})
export class UserDisplayComponent implements OnInit {

  currentUser: User;
	money$: Observable<number>;
	energy$: Observable<number>;

  constructor(private userStateService: UserStateService,
              private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.user;
  	this.money$ = this.userStateService.getMoney();
  	this.energy$ = this.userStateService.getEnergy();
  }

}
