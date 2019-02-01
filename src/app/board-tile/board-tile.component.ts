import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Tile} from '../models/tile.model';

@Component({
  selector: 'app-board-tile',
  templateUrl: './board-tile.component.html',
  styleUrls: ['./board-tile.component.scss']
})
export class BoardTileComponent implements OnInit {

  @Input() tile: Tile;

  @Output() clickTile = new EventEmitter<Tile>();
  @Output() rightClickTile = new EventEmitter<Tile>();


  constructor() { }

  ngOnInit() {
  }

  @HostListener('click', ['$event'])
  public handleClickOnHost( event: MouseEvent ): void {
    this.clickTile.emit(this.tile);
    event.preventDefault();
  }

  @HostListener('contextmenu', ['$event'])
  public handleRightClickOnHost( event: MouseEvent ): void {
    this.rightClickTile.emit(this.tile);
    event.preventDefault();
  }

}
