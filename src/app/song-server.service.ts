import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import {environment} from '../environments/environment';

import {UserStateService} from './user-state.service';

import { Track } from './dtos/track';
import { CurrentSong } from './dtos/currentSong';
import { PendingSong } from './dtos/pendingSong';

@Injectable({
  providedIn: 'root'
})
export class SongServerService {

	serverPath = environment.serverUrl + "/song";

  currentSong$: BehaviorSubject<any>;

  constructor(private http: HttpClient,
              private userStateService: UserStateService) { 
  }


  //returns {track: Track, offset_ms: number, startTime: string}
  getSong(): Observable<CurrentSong> {
  	return this.http.get(this.serverPath + "/current") as Observable<CurrentSong>;
  }

  getSongQueue(): Observable<PendingSong[]> {
  	return this.http.get(this.serverPath + "/pending") as Observable<PendingSong[]>;
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

  unChooseSong(track: Track) {
    let user = this.userStateService.getUser();
    let body = {track, user}
    let config = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
    return this.http.post(this.serverPath + "/choose/unchoose", body, config)
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
