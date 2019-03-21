import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SpotifyService } from '../spotify.service';
import { SongServerService } from '../song-server.service';
import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-spotify-pending',
  templateUrl: './spotify-pending.component.html',
  styleUrls: ['./spotify-pending.component.scss']
})
export class SpotifyPendingComponent implements OnInit {

	pendingSongs: Observable<any[]>;

  constructor(private spotifyService: SpotifyService,
  						private songServerService: SongServerService,
              private webSocketService: WebSocketService) {
  }

  ngOnInit() {
    this.pendingSongs = this.webSocketService.getSongQueue();
  }

}
