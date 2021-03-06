import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import SpotifyWebApi from 'spotify-web-api-js';
import * as moment from 'moment';

import { SongServerService } from './server/song.service';
import { Track } from './dtos/track';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

	clientId: string;
	redirectUri: string;
	scope: string;
	response_type: string;

  accessToken: string;
  expiresAt: any;

  spotifyApi: any;

  syncWithSpotify: boolean;




  constructor(private http: HttpClient,
              private songService: SongService) {
  	this.clientId = '4ab300b68542479483b2e9b509c8a31e';
  	this.redirectUri = window.location.origin + "/callback";
  	this.scope = 'user-modify-playback-state user-read-currently-playing user-read-playback-state';
  	this.response_type = 'token';

    this.accessToken = null;
    this.expiresAt = null;

    this.syncWithSpotify = false;

    this.spotifyApi = new SpotifyWebApi();

    this.tryLoadToken();
  }

  tryLoadToken() {
    let accessToken = localStorage.getItem("accessToken");
    let expiresAt = localStorage.getItem("expiresAt");

    if(accessToken && expiresAt) {
      this.accessToken = accessToken;
      this.expiresAt = expiresAt;
      this.spotifyApi.setAccessToken(this.accessToken);
    }
  }

  authorize() {
  	let baseUrl = "https://accounts.spotify.com/authorize?";
  	let params = new HttpParams();
  	params = params.append('client_id', this.clientId);
  	params = params.append('redirect_uri', this.redirectUri);
  	params = params.append('scope', this.scope);
  	params = params.append('response_type', this.response_type);

  	let fullUrl = baseUrl + params.toString();
  	window.location.replace(fullUrl);
  }

  authResponse(queryParams) {
  	let accessToken = queryParams.get('access_token');
  	let tokenType = queryParams.get('token_type');
  	let expiresIn = queryParams.get('expires_in');
  	let state = queryParams.get('state');
  	let error = queryParams.get('error');

  	if (accessToken) {
      this.accessToken = accessToken;
      console.log(accessToken);
      this.expiresAt = moment().add(expiresIn, 'seconds');
      this.spotifyApi.setAccessToken(this.accessToken);

      localStorage.setItem("accessToken", this.accessToken);
      localStorage.setItem("expiresAt", this.expiresAt);

    } else {
      console.log("Error logging in to spotify: " + error);
    }
  }

  isLoggedInToSpotify(): boolean {
    return this.accessToken && this.expiresAt && moment().isBefore(this.expiresAt);
  }

  getTokenExpiry() {
    return this.expiresAt;
  }

  getUser() {
    return this.spotifyApi.getMe();
  }

  getCurrentlyPlaying() {
    return this.spotifyApi.getMyCurrentPlaybackState();
  }

  getSong(id: string) {
  }

  setSong(track: Track, position_ms: number) {
    if(this.accessToken && this.syncWithSpotify) {
      return this.spotifyApi.play({uris: [track.uri], position_ms});
    }
  }

  searchForSong(searchText: string): Promise<any> {
    return this.spotifyApi.searchTracks(searchText, {limit: 5});
  }

  setSync(sync: boolean) {
    this.syncWithSpotify = sync;
    if(sync) {
      this.songService.getSong().subscribe(song => {
        if (song && song.track) {
          this.setSong(song.track, song.offset_ms);
        }
      });
    }
  }

  getSync() {
    return this.syncWithSpotify;
  }
}
