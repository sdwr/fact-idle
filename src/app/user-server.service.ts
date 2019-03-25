import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServerService {

	readonly serverPath = environment.serverUrl + "/users";

  constructor(private http: HttpClient) {
  }

  getUserByName(username: string) {
  	return this.http.get(this.serverPath + "/" + username);
  }

  getUserState(username: string) {
  	return this.http.get(this.serverPath + "/" + username + "/state");
  }

  setUserState(username: string, state: any) {
  	let body = new HttpParams().set('state', state);
  	let config = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
  	return this.http.post(this.serverPath + "/" + username + "/state", body, config);
  }

  getChatHistory() {
  	return this.http.get(environment.serverUrl + "/chatHistory");
  }

}
