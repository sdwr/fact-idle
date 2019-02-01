import { Injectable } from '@angular/core';
import {createTile} from './models/tile.model';
import {GameService} from './store/game.service';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  constructor(private gameService: GameService) {
    this.initTiles();
  }

  initTiles() {
    this.gameService.createTiles(this.mockTileData());
  }

  mockTileData() {
    return Array.from(Array(25).keys()).map(i => createTile(i, 0));
  }


}
