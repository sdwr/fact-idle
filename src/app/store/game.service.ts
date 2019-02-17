import { Injectable } from '@angular/core';
import {Tile} from '../models/tile.model';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {CreateTiles, UpdateTile} from './game.actions';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private store: Store) {}

  getTiles(): Observable<Tile[]> {
    return this.store.select(state => state.tiles);
  }

  getTilesSnapshot(): Tile[] {
    return this.store.selectSnapshot(state => state.tiles);
  }

  createTiles(tiles: Tile[]): Observable<any> {
    return this.store.dispatch(new CreateTiles(tiles));
  }

  updateTile(tile: Tile): Observable<any> {
    return this.store.dispatch(new UpdateTile(tile));
  }

}
