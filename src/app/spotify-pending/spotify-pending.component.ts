import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SpotifyService } from '../spotify.service';
import { SongService } from '../server/song.service';
import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-spotify-pending',
  templateUrl: './spotify-pending.component.html',
  styleUrls: ['./spotify-pending.component.scss']
})
export class SpotifyPendingComponent implements OnInit {

	pendingSongs$: Observable<any[]>;

  constructor(private spotifyService: SpotifyService,
  						private songService: SongService,
              private webSocketService: WebSocketService) {
  }

  ngOnInit() {
    this.pendingSongs$ = this.webSocketService.getSongQueue();
  }

}
