import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../spotify.service';
import { SongServerService } from '../song-server.service';

@Component({
  selector: 'app-spotify-pending',
  templateUrl: './spotify-pending.component.html',
  styleUrls: ['./spotify-pending.component.scss']
})
export class SpotifyPendingComponent implements OnInit {

	pendingSongs: any;

  constructor(private spotifyService: SpotifyService,
  						private songServerService: SongServerService) {
  	this.pendingSongs = [];
  }

  ngOnInit() {
  	this.getNext();
  }

  getNext() {
  	this.songServerService.getNextSongList()
  		.subscribe(res => {
  			this.pendingSongs = res;
  			console.log(res);
  		});
  }



}
