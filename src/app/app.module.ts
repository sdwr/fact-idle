import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
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
import { CallbackComponent } from './callback/callback.component';
import { SpotifyPlayerComponent } from './spotify-player/spotify-player.component';
import { SpotifySongSelectorComponent } from './spotify-song-selector/spotify-song-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeBoardComponent,
    HomeBuildingsComponent,
    HomeViewComponent,
    BoardTileComponent,
    BuildingTileComponent,
    UserDisplayComponent,
    CallbackComponent,
    SpotifyPlayerComponent,
    SpotifySongSelectorComponent
  ],
  imports: [
    NgxsModule.forRoot([TileState]),
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
