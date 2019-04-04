import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

	readonly roomPath = environment.serverUrl + "/rooms";

  constructor(private http: HttpClient) { }

  getAllRooms() {
  	return this.http.get(this.roomPath);
  }

  getRoom(roomId: string) {
  	return this.http.get(this.roomPath + "/" + roomId);
  }

  addRoom(name: string) {
  	let body = new HttpParams().set('name', name);
  	let config = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
  	return this.http.post(this.roomPath, body, config);
  }

  deleteRoom(roomId: string) {
  	return this.http.delete(this.roomPath + "/" + roomId);
  }


}
