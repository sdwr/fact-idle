import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Building } from '../models/building.model';

@Component({
  selector: 'app-building-tile',
  templateUrl: './building-tile.component.html',
  styleUrls: ['./building-tile.component.scss']
})
export class BuildingTileComponent implements OnInit {

	buildingList = [
    '/assets/building0.png',
    '/assets/building1.png',
    '/assets/building2.png',
    '/assets/building3.png',
    '/assets/building4.png'
  ];

	@Input() building: Building;

	@Output() mousedownBuilding = new EventEmitter<Building>();
	
  constructor() { }

  ngOnInit() {
  }

  @HostListener('mousedown', ['$event'])
  public handleMousedown( event: MouseEvent ): void {
    this.mousedownBuilding.emit(this.building);
    event.preventDefault();
  }

}
