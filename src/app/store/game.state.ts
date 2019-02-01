import {Action, State, StateContext} from '@ngxs/store';
import {Tile} from '../models/tile.model';
import {CreateTiles, UpdateTile} from './game.actions';

@State<Tile[]>({
  name: 'tiles',
  defaults: []
})
export class TileState {
  @Action(CreateTiles)
  createTiles(ctx: StateContext<Tile[]>, action: CreateTiles) {
    ctx.setState(action.tiles);
  }

  @Action(UpdateTile)
  updateTile(ctx: StateContext<Tile[]>, action: UpdateTile) {
    const state = ctx.getState();
    const tileIndex = state.findIndex(t => t.id === action.tile.id);
    state.splice(tileIndex, 1, action.tile);
    ctx.setState(state);
  }
}
