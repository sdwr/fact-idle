import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-spotify-song-selector',
  templateUrl: './spotify-song-selector.component.html',
  styleUrls: ['./spotify-song-selector.component.scss']
})
export class SpotifySongSelectorComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  setSong(songId) {
  	this.spotifyService.setSong(songId);
  }

}
