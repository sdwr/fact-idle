import { Component, OnInit, Input } from '@angular/core';

import { SpotifyService } from '../spotify.service';
import { SpotifyTrack } from '../models/spotifyTrack.model';

@Component({
  selector: 'app-spotify-song',
  templateUrl: './spotify-song.component.html',
  styleUrls: ['./spotify-song.component.scss']
})
export class SpotifySongComponent implements OnInit {

	@Input() song: SpotifyTrack;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  setCurrentSong() {
  	this.spotifyService.setSong(this.song.id, 0);
  }

}
