import { Component, OnInit, Input } from '@angular/core';

import { SongServerService } from '../song-server.service';
import { UserStateService } from '../user-state.service';

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

  constructor(private songServerService: SongServerService,
  						private userStateService: UserStateService) { }

  ngOnInit() {
  	this.track = this.songObj.track;
  	this.chosenBy = this.songObj.chosenBy;
  	this.score = this.songObj.score;
  }

  choosePending() {
  		this.songServerService.chooseSong(this.track);
  }

  unchoosePending() {
    this.songServerService.unChooseSong(this.track);
  }

  isChosenByMe() {
  	let user = this.userStateService.getUser();
  	return !!this.chosenBy.find(u => u.userId === user.userId);
  }

}
