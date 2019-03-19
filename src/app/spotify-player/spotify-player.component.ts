import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.scss']
})
export class SpotifyPlayerComponent implements OnInit {

	readonly REFRESH_TIME = 5000;

	playContext: any;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  	this.updateLoop();
  }

  updateLoop() {
  	this.updateContext();
  	setTimeout(() => this.updateLoop(), this.REFRESH_TIME);
  }

  updateContext() {
  	//this.spotifyService.getCurrentlyPlaying().then(x => this.playContext = x);
  }

}
