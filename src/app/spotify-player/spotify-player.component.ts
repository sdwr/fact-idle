import { Component, OnInit } from '@angular/core';

import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.scss']
})
export class SpotifyPlayerComponent implements OnInit {

	readonly REFRESH_TIME = 5000;

	playContext: any;

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {
  }



}
