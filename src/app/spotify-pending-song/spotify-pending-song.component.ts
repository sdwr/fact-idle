import { Component, OnInit, Input } from '@angular/core';

import { SongService } from '../server/song.service';
import { UserService } from '../server/user.service';

import {User} from '../dtos/user';
import {Track} from '../dtos/track';

@Component({
  selector: 'app-spotify-pending-song',
  templateUrl: './spotify-pending-song.component.html',
  styleUrls: ['./spotify-pending-song.component.scss']
})
export class SpotifyPendingSongComponent implements OnInit {

	@Input() songObj: any
	track: Track;
	chosenBy: any[];
	score: number;

  constructor(private songService: SongService,
  						private userService: UserService) { }

  ngOnInit() {
  	this.track = this.songObj.track;
  	this.chosenBy = this.songObj.chosenBy;
  	this.score = this.songObj.score;
  }

  choosePending() {
  }

  isChosenByMe() {
  }

}
