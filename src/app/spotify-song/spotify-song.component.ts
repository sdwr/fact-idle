import { Component, OnInit, Input } from '@angular/core';

import { SongServerService } from '../song-server.service';
import { Track } from '../dtos/track';

@Component({
  selector: 'app-spotify-song',
  templateUrl: './spotify-song.component.html',
  styleUrls: ['./spotify-song.component.scss']
})
export class SpotifySongComponent implements OnInit {

	@Input() song: Track;

  constructor(private songServerService: SongServerService) { }

  ngOnInit() {
  }

  setCurrentSong() {
  	this.songServerService.addSong(this.song);
  }

}
