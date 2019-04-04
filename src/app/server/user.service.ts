import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';


import * as moment from 'moment';

import { Observable} from 'rxjs';
import {tap} from 'rxjs/operators';


import {environment} from '../../environments/environment';

import {User} from '../dtos/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	readonly userPath = environment.serverUrl + "/user";
  readonly usersPath = environment.serverUrl + "/users";

  user: User;

  constructor(private http: HttpClient) {
    this.user = null;
    this.loginFlow();

  }

  loginFlow(username: string) {
    let user = localStorage.getItem("userId");
    console.log(userId);
    if (userId) {
      this.tryLoginAs(userId);
    } else {
      this.getNewUser(username);
    }
  }

  tryLoginAs(userId: string) {
    this.getUserById(user._id)
      .subscribe(u => {
        this.user = u;
        console.log("logged in as %s", JSON.stringify(u));
      },() => this.getNewUser);
  }

  getNewUser(username: string) {
    this.createUser(username)
      .subscribe(user => {
          localStorage.setItem("user", user);
          this.user = user;
        });
  }

  getAllUsers() {
    return this.http.get(this.usersPath);
  }

  getActiveUsers() {
    return this.http.get(this.usersPath + "/online");
  }

  getUserById(userId: string) {
    return this.http.get(this.userPath + "/" + userId);
  }

  findUser(name: string) {
    let body = new HttpParams.set('name', name);
    let config = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
    return this.http.get(this.userPath, body, config);
  }

  createUser(name: string) {
    let body = new HttpParams.set('name', name);
    let config = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
    return this.http.post(this.userPath, body, config)
      .pipe(tap(u => this.user = u));
  }

  updateUser(user: User) {
    let body = new HttpParams.set(user);
    let config = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
    return this.http.put(this.userPath, body, config)
      .pipe(tap(u => this.user = u));
  }

  getUserState(userId: number) {
  	return this.http.get(this.userPath + "/" + userId + "/state");
  }

  setUserState(userId: number, state: any) {
  	let body = new HttpParams().set('state', state);
  	let config = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
  	return this.http.post(this.userPath + "/" + userId + "/state", body, config);
  }
}
