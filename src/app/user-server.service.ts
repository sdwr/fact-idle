import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServerService {

	readonly serverPath = "/users";

  constructor(private http: HttpClient) {
  }

  getUserByName(username: string) {
  	return this.http.get(this.serverPath + "/" + username);
  }


}
