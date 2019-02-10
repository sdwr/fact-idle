import { Injectable } from '@angular/core';
import {createTile} from './models/tile.model';
import {GameService} from './store/game.service';
import { Observable, BehaviorSubject, pipe } from 'rxjs';
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

}
