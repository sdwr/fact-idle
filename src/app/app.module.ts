import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeBoardComponent } from './home-board/home-board.component';
import { HomeBuildingsComponent } from './home-buildings/home-buildings.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { BoardTileComponent } from './board-tile/board-tile.component';

import {NgxsModule} from '@ngxs/store';
import {TileState} from './store/game.state';

@NgModule({
  declarations: [
    AppComponent,
    HomeBoardComponent,
    HomeBuildingsComponent,
    HomeViewComponent,
    BoardTileComponent
  ],
  imports: [
    NgxsModule.forRoot([TileState]),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
