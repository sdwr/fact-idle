import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import {UserStateService} from './user-state.service';

import { Track } from './dtos/track';

@Injectable({
  providedIn: 'root'
})
export class SongServerService {

	serverPath = "/song";

  currentSong$: BehaviorSubject<any>;

  constructor(private http: HttpClient,
              private userStateService: UserStateService) { 
  }


  //returns {track: Track, offset_ms: number, startTime: string}
  getSong() {
  	return this.http.get(this.serverPath + "/current");
  }

  getSongQueue() {
  	return this.http.get(this.serverPath + "/pending");
  }

  addSong(track: Track) {
    let user = this.userStateService.getUser();
    let body = {track, user}
    let config = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
    return this.http.post(this.serverPath + "/add/", body, config)
      .subscribe();
  }

  chooseSong(track: Track) { 
    let user = this.userStateService.getUser();
    let body = {track, user}
    let config = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
  	return this.http.post(this.serverPath + "/choose/", body, config)
      .subscribe();
  }

  voteSong(track: Track, score: number) {
    let user = this.userStateService.getUser();
    let body = {track, score, user}
    let config = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
  	return this.http.post(this.serverPath + "/vote/", body, config)
      .subscribe();
  }
}
