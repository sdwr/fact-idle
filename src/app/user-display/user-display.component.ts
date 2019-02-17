import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserStateService } from '../user-state.service';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.scss']
})
export class UserDisplayComponent implements OnInit {

	money$: Observable<number>;
	energy$: Observable<number>;

  constructor(private userStateService: UserStateService) { }

  ngOnInit() {
  	this.money$ = this.userStateService.getMoney();
  	this.energy$ = this.userStateService.getEnergy();
  }

}
