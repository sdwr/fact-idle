import { Component, OnInit } from '@angular/core';
import {GameStateService} from '../game-state.service';
import {Tile} from '../models/tile.model';
import {Observable, BehaviorSubject} from 'rxjs';
import {GameService} from '../store/game.service';
import {UserStateService} from '../user-state.service';

@Component({
  selector: 'app-home-board',
  templateUrl: './home-board.component.html',
  styleUrls: ['./home-board.component.scss']
})
export class HomeBoardComponent implements OnInit {

  tiles$: Observable<Tile[]>;
  path$: BehaviorSubject<number[]>;

  constructor(private gameStateService: GameStateService,
              private gameService: GameService,
              private userStateService: UserStateService) {
  }

  ngOnInit() {
    this.tiles$ = this.gameService.getTiles();
    this.path$ = this.gameStateService.getPath();
  }

  rightClickTile( tile: Tile): void {
  }

  mousedownTile( tile: Tile): void {
    this.gameStateService.resetPath();
    this.gameStateService.addToPath(tile.id);
  }

  mouseupTile( tile: Tile): void {
    if (this.path$.value.length > 1) {
      this.gameStateService.handlePath(this.path$.value);
    } else {
      let buildingId = this.gameStateService.getCurrentBuildingId();
      if (buildingId != null) {
        if (this.userStateService.tryBuild(buildingId)) {
          tile.contains = buildingId;
          this.gameService.updateTile(tile);
          this.gameStateService.setCurrentBuildingId(null);
        }
      }
    }
  }

  mouseoverTile( tile: Tile): void {
    if (this.path$.value.length > 0 && !this.path$.value.find(t => t === tile.id)) {
      this.gameStateService.addToPath(tile.id);
    } 
  }

}
