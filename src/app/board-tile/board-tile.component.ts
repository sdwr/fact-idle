import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Tile} from '../models/tile.model';

@Component({
  selector: 'app-board-tile',
  templateUrl: './board-tile.component.html',
  styleUrls: ['./board-tile.component.scss']
})
export class BoardTileComponent implements OnInit {

  @Input() tile: Tile;

  @Output() rightClickTile = new EventEmitter<Tile>();
  @Output() mousedownTile = new EventEmitter<Tile>();
  @Output() mouseupTile = new EventEmitter<Tile>();
  @Output() mouseoverTile = new EventEmitter<Tile>();


  constructor() { }

  ngOnInit() {
  }

  @HostListener('contextmenu', ['$event'])
  public handleRightClickOnHost( event: MouseEvent ): void {
    this.rightClickTile.emit(this.tile);
    event.preventDefault();
  }

  @HostListener('mousedown', ['$event'])
  public handleMousedown( event: MouseEvent ): void {
    this.mousedownTile.emit(this.tile);
    event.preventDefault();
  }
  
  @HostListener('mouseup', ['$event'])
  public handeMouseup( event: MouseEvent ): void {
    this.mouseupTile.emit(this.tile);
    event.preventDefault();
  }

  @HostListener('mouseover', ['$event'])
  public handleMouseover( event: MouseEvent ): void {
    this.mouseoverTile.emit(this.tile);
    event.preventDefault();
  }

}
