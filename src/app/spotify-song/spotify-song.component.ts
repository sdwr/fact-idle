import { Component, OnInit, Input } from '@angular/core';

import { SongService } from '../server/song.service';
import { Track } from '../dtos/track';

@Component({
  selector: 'app-spotify-song',
  templateUrl: './spotify-song.component.html',
  styleUrls: ['./spotify-song.component.scss']
})
export class SpotifySongComponent implements OnInit {

	@Input() song: Track;

  constructor(private songService: SongService) { }

  ngOnInit() {
  }

  setCurrentSong() {
  	this.songService.addSong(this.song);
  }

}
