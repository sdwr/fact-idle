import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SongServerService {

	serverPath = "/song";

  constructor(private http: HttpClient) { }


  getSong() {
  	return this.http.get(this.serverPath + "/get");
  }

  getNextSongList() {
  	return this.http.get(this.serverPath + "/getNext");
  }

  putSong(songId: string) { 
  	return this.http.get(this.serverPath + "/put/" + songId);
  }

  voteSong(songId, score) {
  	return this.http.get(this.serverPath + "/vote/" + songId + "/" + score);
  }
}
