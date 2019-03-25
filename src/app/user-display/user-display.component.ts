import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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

  constructor(private userStateService: UserStateService) { }

  ngOnInit() {
    this.currentUser = this.userStateService.getUser();
  	this.money$ = this.userStateService.getMoney();
  	this.energy$ = this.userStateService.getEnergy();
  }

}
