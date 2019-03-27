import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServerService {

	readonly userPath = environment.serverUrl + "/user";
  readonly usersPath = environment.serverUrl + "/users";

  constructor(private http: HttpClient) {
  }

  getUserByName(username: string) {
  	return this.http.get(this.userPath + "/" + username);
  }

  getUserState(username: string) {
  	return this.http.get(this.userPath + "/" + username + "/state");
  }

  setUserState(username: string, state: any) {
  	let body = new HttpParams().set('state', state);
  	let config = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
  	return this.http.post(this.userPath + "/" + username + "/state", body, config);
  }

  getAllUsers() {
    return this.http.get(this.usersPath + "/all");
  }

  getActiveUsers() {
    return this.http.get(this.usersPath + "/online");
  }

  getChatHistory() {
  	return this.http.get(environment.serverUrl + "/chatHistory");
  }

}
