import { Component, OnInit } from '@angular/core';
import {GameStateService} from '../game-state.service';
import {Tile} from '../models/tile.model';
import {Observable} from 'rxjs';
import {GameService} from '../store/game.service';

@Component({
  selector: 'app-home-board',
  templateUrl: './home-board.component.html',
  styleUrls: ['./home-board.component.scss']
})
export class HomeBoardComponent implements OnInit {

  tiles$: Observable<Tile[]>;

  constructor(private gameStateService: GameStateService,
              private gameService: GameService) {
  }

  ngOnInit() {
    this.tiles$ = this.gameService.getTiles();
  }

  clickTile( tile: Tile): void {
    tile.contains === 1 ? tile.contains = 0 : tile.contains = 1;
    this.gameService.updateTile(tile);
  }

  rightClickTile( tile: Tile): void {
    tile.contains = 2;
    this.gameService.updateTile(tile);
  }

}
