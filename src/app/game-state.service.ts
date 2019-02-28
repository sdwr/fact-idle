import { Injectable } from '@angular/core';
import {createTile} from './models/tile.model';
import { Building} from './models/building.model';
import { Tile } from './models/tile.model';
import {GameService} from './store/game.service';
import { Observable, BehaviorSubject, pipe, of } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  currentBuildingId: number;

  path$: BehaviorSubject<number[]>;
  tiles$: Observable<Tile[]>;

  constructor(private gameService: GameService) {
    this.currentBuildingId = null;
    this.initTiles();
    this.initPath();
  }

  initTiles() {
    this.gameService.createTiles(this.mockTileData());
    this.tiles$ = this.gameService.getTiles();
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
    let tileChangeDict = {};
    let newPath = path.slice(1);
    newPath.push(path[0]);
    path.forEach((tileId, i) => tileChangeDict[tileId] = newPath[i]);

    let tiles = this.gameService.getTilesSnapshot();
    let newTiles = tiles.map(t => {
      if (tileChangeDict[t.id]) {
        t = {...t}
        t.contains = tiles.find(tile => tile.id === tileChangeDict[t.id]).contains;
      }
      return t;
    });

    newTiles.forEach(t => this.gameService.updateTile(t));
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

  getCurrentBuildingId() {
    return this.currentBuildingId;
  }

  setCurrentBuildingId(id: number) { 
    this.currentBuildingId = id;
  }

}
