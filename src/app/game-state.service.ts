import { Injectable } from '@angular/core';
import {createTile} from './models/tile.model';
import { Building} from './models/building.model';
import {GameService} from './store/game.service';
import { Observable, BehaviorSubject, pipe, of } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  path$: BehaviorSubject<number[]>;

  constructor(private gameService: GameService) {
    this.initTiles();
    this.initPath();
  }

  initTiles() {
    this.gameService.createTiles(this.mockTileData());
  }

  mockTileData() {
    return Array.from(Array(25).keys()).map(i => createTile(i, 0));
  }

  initPath() {
    this.path$ = new BehaviorSubject([]);
  }

  pathExists(): Observable<boolean> {
    return this.path$.pipe(map(x => x != []));
  }

  resetPath() {
    this.path$.next([]);
  }

  getPath(): BehaviorSubject<number[]> {
    return this.path$;
  }

  addToPath(id: number) {
    let path = this.path$.value;
    if (!path.includes(id)) {
      path.push(id);
      this.path$.next(path);
    }
  }

  removeFromPath(id: number) {
    let path = this.path$.value;
    if (path != [] && path.slice(-1)[0] === id) {
      path.pop();
      this.path$.next(path);
    }
  }

  handlePath(path: number[]) {
    return null;
  }

  getMockBuildings(): Observable<Building[]> {
    let mockBuildings = [
      {id: 0, visible: true, cost: 5, 
        energyToMove: 5, moneyPerMinute: 2, energyPerMinute: 0,
        img: "building0.png"},
      {id: 1, visible: true, cost: 5,
        energyToMove: 1, moneyPerMinute: 1, energyPerMinute: 5,
        img: "building1.png"},
      {id: 2, visible: true, cost: 20,
        energyToMove: 20, moneyPerMinute: 10, energyPerMinute: 5,
        img: "building2.png"},
      {id: 3, visible: true, cost: 50,
        energyToMove: 25, moneyPerMinute: 15, energyPerMinute: 10,
        img: "building3.png"},
      {id: 4, visible: true, cost: 10,
        energyToMove: 1, moneyPerMinute: 1, energyPerMinute: 10,
        img: "building4.png"}
    ];
    return of(mockBuildings);
  }

}
