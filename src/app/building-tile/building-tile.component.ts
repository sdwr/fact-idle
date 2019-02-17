import { Component, OnInit, Input } from '@angular/core';
import { Building } from '../models/building.model';

@Component({
  selector: 'app-building-tile',
  templateUrl: './building-tile.component.html',
  styleUrls: ['./building-tile.component.scss']
})
export class BuildingTileComponent implements OnInit {

	@Input() building: Building;
	
  constructor() { }

  ngOnInit() {
  }

}
