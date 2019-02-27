import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';

import { SpotifyTrack } from '../models/spotifyTrack.model';

@Component({
  selector: 'app-spotify-song-search',
  templateUrl: './spotify-song-search.component.html',
  styleUrls: ['./spotify-song-search.component.scss']
})
export class SpotifySongSearchComponent implements OnInit {

	searchResults: SpotifyTrack[];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  	this.searchResults = [];
  }

  searchForSong(searchText: string) {
  	this.spotifyService.searchForSong(searchText)
  		.then(songs => this.searchResults = songs.tracks.items.slice(0,5));
  }



}
