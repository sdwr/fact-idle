import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {SpotifyService} from './spotify.service';

interface Song {
  song: string;
  position_ms: number;
}

@Injectable({
  providedIn: 'root'
})
export class SongServerService {

	serverPath = "/song";

  constructor(private http: HttpClient,
              private spotifyService: SpotifyService) { }


  getSong() {
  	return this.http.get(this.serverPath + "/current");
  }

  syncSong() {
    this.getSong().subscribe((songObj: Song) => {
      this.spotifyService.setSong(songObj.song, songObj.position_ms);
    });
  }

  getNextSongList() {
  	return this.http.get(this.serverPath + "/pending");
  }

  putSong(songId: string) { 
  	return this.http.get(this.serverPath + "/choose/" + songId);
  }

  voteSong(songId, score) {
  	return this.http.get(this.serverPath + "/vote/" + songId + "/" + score);
  }
}
