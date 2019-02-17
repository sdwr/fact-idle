import { Injectable } from '@angular/core';
import { GameService } from './store/game.service';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

	money$: BehaviorSubject<number>
	energy$: BehaviorSubject<number>

	moneyPerMinute: number;
	energyPerMinute: number;

	time: Date

  constructor(private gameService: GameService) {
  	this.time = new Date();
  	this.initUser();
  	this.updateLoop();
  }

  initUser() {
  	this.money$ = new BehaviorSubject(10);
  	this.energy$ = new BehaviorSubject(50);

  	this.moneyPerMinute = 0;
  	this.energyPerMinute = 10; 
  }

  updateLoop() {
  	//to do
 		//update user money and energy : sleep??
 		return null;
  }

  getMoney() {
    return this.money$;
  }

  getEnergy() {
    return this.energy$;
  }

  updateMoney(update: number) {
    this.money$.next(this.money$.value + update);
  }

  updateEnergy(update: number) {
    this.energy$.next(this.energy$.value + update);
  }
}