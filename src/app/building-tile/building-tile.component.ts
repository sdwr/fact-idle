import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Building } from '../models/building.model';

@Component({
  selector: 'app-building-tile',
  templateUrl: './building-tile.component.html',
  styleUrls: ['./building-tile.component.scss']
})
export class BuildingTileComponent implements OnInit {

	@Input() building: Building;

	@Output() mousedownBuilding = new EventEmitter<Building>();
	
  constructor() { }

  ngOnInit() {
  }

}
