import { Component, OnInit } from '@angular/core';

import { Building } from '../models/building.model';
import { GameService } from '../store/game.service';
import { GameStateService } from '../game-state.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home-buildings',
  templateUrl: './home-buildings.component.html',
  styleUrls: ['./home-buildings.component.scss']
})
export class HomeBuildingsComponent implements OnInit {

	buildings$: Observable<Building[]>;

  constructor(private gameService: GameService,
  						private gameStateService: GameStateService) 
  {
  }

  ngOnInit() {
  	this.buildings$ = of(this.gameStateService.getMockBuildings());
  }

  mouseDownBuilding(building: Building) {
    this.gameStateService.setCurrentBuildingId(building.id);
  }

}
