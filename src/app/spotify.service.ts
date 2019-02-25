import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import SpotifyWebApi from 'spotify-web-api-js';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

	clientId: string;
	redirectUri: string;
	scope: string;
	response_type: string;

  accessToken: string;
  expiresAt: Date;

  spotifyApi: any;


  constructor(private http: HttpClient) {
  	this.clientId = '4ab300b68542479483b2e9b509c8a31e';
  	this.redirectUri = 'https://localhost:4200/callback';
  	this.scope = 'user-modify-playback-state user-read-currently-playing user-read-playback-state';
  	this.response_type = 'token';

    this.accessToken = null;
    this.expiresAt = null;

    this.spotifyApi = new SpotifyWebApi();
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
      this.expiresAt = new Date(Date.now() + (expiresIn*1000));
      this.spotifyApi.setAccessToken(this.accessToken);

    } else {
      console.log("Error logging in to spotify: " + error);
    }
  }

  getCurrentToken() {
    return this.expiresAt;
  }

  getUser() {
    return this.spotifyApi.getMe();
  }


}
