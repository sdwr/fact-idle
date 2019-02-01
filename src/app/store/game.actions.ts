import {Tile} from '../models/tile.model';


export class CreateTiles {
  static readonly type = 'CreateTiles';
  constructor(public tiles: Tile[]) {}
}

export class UpdateTile {
  static readonly type = 'UpdateTile';
  constructor(public tile: Tile) {}
}

