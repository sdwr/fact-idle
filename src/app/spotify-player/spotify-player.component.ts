import { Component, OnInit } from '@angular/core';
import {BehaviorSubject } from 'rxjs';

import { SpotifyService } from '../spotify.service';
import { SongServerService } from '../song-server.service';
import { Track} from '../dtos/track';
import {DataStreamService} from "../data-stream.service";

@Component({
  selector: 'app-spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.scss']
})
export class SpotifyPlayerComponent implements OnInit {

  UPDATE_MS = 10000;

  currentSong$: BehaviorSubject<any>;
  syncWithSpotify: boolean;

	currentProgress: number;

  constructor(private dataStreamService: DataStreamService,
              private spotifyService: SpotifyService,
              private songServerService: SongServerService) { }

  ngOnInit() {
    this.syncWithSpotify = this.spotifyService.getSync();
    this.currentSong$ = this.dataStreamService.getCurrentSong();
    this.currentSong$.subscribe(x => {
      this.currentProgress = 0;
    });
    this.updateProgress();
  }

  updateProgress() {
    this.songServerService.getSong().subscribe(songObj => {
      if(songObj && songObj.track) {
        this.currentProgress = this.percentComplete(songObj);
      } else {
        this.currentProgress = 0;
      }
    });
    setTimeout(() => {this.updateProgress()}, this.UPDATE_MS);
  }

  percentComplete(songObj: any) {
    let track: Track = songObj.track;
    let offset_ms: number = songObj.offset_ms;
    let duration_ms: number = songObj.track.duration_ms;

    let percentDone = offset_ms * 100.0 / duration_ms;
    return percentDone;

  }

  setSync(event) {
    this.spotifyService.setSync(event.checked);
    this.syncWithSpotify = this.spotifyService.getSync();
  }



}
