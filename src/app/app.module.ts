import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeBoardComponent } from './home-board/home-board.component';
import { HomeBuildingsComponent } from './home-buildings/home-buildings.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { BoardTileComponent } from './board-tile/board-tile.component';

import {NgxsModule} from '@ngxs/store';
import {TileState} from './store/game.state';
import { BuildingTileComponent } from './building-tile/building-tile.component';
import { UserDisplayComponent } from './user-display/user-display.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeBoardComponent,
    HomeBuildingsComponent,
    HomeViewComponent,
    BoardTileComponent,
    BuildingTileComponent,
    UserDisplayComponent
  ],
  imports: [
    NgxsModule.forRoot([TileState]),
    BrowserModule,
    AppRoutingModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
