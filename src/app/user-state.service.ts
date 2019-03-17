import { Injectable } from '@angular/core';
import { GameService } from './store/game.service';
import { GameStateService } from './game-state.service';

import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

export interface User {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  user: User;

	money$: BehaviorSubject<number>;
	energy$: BehaviorSubject<number>;

	moneyPerMinute: number;
	energyPerMinute: number;

	time: any;

  REFRESH_TIME = 5000;
  

  constructor(private gameService: GameService,
              private gameStateService: GameStateService) {
  	this.time = moment();
    this.username = null;
    this.user = null;
  	this.initUser();
  	this.updateLoop();
  }

  getUser(): User {
    return this.user;
  }

  setUser(username: string) {
    this.user = {username};
    this.getUserStats(this.username);
    return this.user;
  }

  getUserStats(username: string) {
    //get user stats from server
    //gotta put money calc on server probably :()
  }

  initUser() {
  	this.money$ = new BehaviorSubject(10);
  	this.energy$ = new BehaviorSubject(50);

  	this.moneyPerMinute = 0;
  	this.energyPerMinute = 10; 
  }

  updateLoop() {
    this.updateStats(this.REFRESH_TIME);
    setTimeout(() => this.updateLoop(), this.REFRESH_TIME);
  }

  getMoney() {
    return this.money$;
  }

  getEnergy() {
    return this.energy$;
  }

  updateStats(millis: number) {
    let buildings = this.gameStateService.getMockBuildings();
    let tiles = this.gameService.getTilesSnapshot();
    let uM = 0;
    let uE = 0;
    tiles.forEach(t => {
      if (t.contains > -1) {
        let b = buildings[t.contains]; 
        uM += b.moneyPerMinute;
        uE += b.energyPerMinute;
      }
    });
    this.money$.next(this.money$.value + (uM*millis/(60*1000)));
    this.energy$.next(this.energy$.value + (uE*millis/(60*1000)));
  }

  tryBuild(buildingId: number) {
    let buildings = this.gameStateService.getMockBuildings();
    let cost = buildings[buildingId].cost;
    let money = this.getMoney().value;
    if (money >= cost) {
      this.money$.next(money - cost);
      return true;
    } else {
      return false;
    }

  }

  tryMove(energyCost: number) {
    let energy = this.getEnergy().value;
    if (energy - energyCost > 0) {
      this.energy$.next(energy - energyCost);
      return true;
    } else {
      return false;
    }
  }
}