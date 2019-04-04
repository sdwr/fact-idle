import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule, Routes } from '@angular/router';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
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
import { SpotifySongSearchComponent } from './spotify-song-search/spotify-song-search.component';
import { SpotifySongComponent } from './spotify-song/spotify-song.component';
import { SpotifyPendingComponent } from './spotify-pending/spotify-pending.component';
import { ChatPanelComponent } from './chat-panel/chat-panel.component';
import { LoginComponent } from './login/login.component';
import { SpotifyDropSongComponent } from './spotify-drop-song/spotify-drop-song.component';
import { SpotifyPendingSongComponent } from './spotify-pending-song/spotify-pending-song.component';
import { UsersOnlineComponent } from './users-online/users-online.component';
import { RoomListComponent } from './room-list/room-list.component';

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
    SpotifySongSearchComponent,
    SpotifySongComponent,
    SpotifyPendingComponent,
    ChatPanelComponent,
    LoginComponent,
    SpotifyDropSongComponent,
    SpotifyPendingSongComponent,
    UsersOnlineComponent,
    RoomListComponent
  ],
  imports: [
    NgxsModule.forRoot([TileState]),
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DragDropModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
