import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import {environment} from '../../environments/environment';

import {UserService} from './user.service';

import { Track } from '../dtos/track';
import { CurrentSong } from '../dtos/currentSong';
import { PendingSong } from '../dtos/pendingSong';

@Injectable({
  providedIn: 'root'
})
export class SongService {

	serverPath = environment.serverUrl + "/songs";

  currentSong$: BehaviorSubject<any>;

  constructor(private http: HttpClient,
              private userService: UserService) { 
  }


  //returns {track: Track, offset_ms: number, startTime: string}
  getSong(roomId: string): Observable<CurrentSong> {
  	return this.http.get(this.serverPath + "/" + roomId + "/current") as Observable<CurrentSong>;
  }

  getSongQueue(roomId: string): Observable<PendingSong[]> {
  	return this.http.get(this.serverPath + "/" + roomId + "/pending") as Observable<PendingSong[]>;
  }

  addSong(roomId: string, userId: string, track: Track) {
    let body = new HttpParams()
      .set('roomId', roomId)
      .set('userId', userId)
      .set('trackId', track.id);
    let config = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
    return this.http.post(this.serverPath + "/pending", body, config)
      .subscribe();
  }

  voteSong(roomId: string, track: Track, score: number) {
    let user = this.userService.user;
    let body = new HttpParams()
      .set('roomId', roomId)
      .set('userId', user._id)
      .set('trackId', track.id)
      .set('votedScore', score);
    let config = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
  	return this.http.post(this.serverPath + "/vote", body, config)
      .subscribe();
  }
}
