import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SpotifyService } from '../spotify.service';
import { UserStateService} from '../user-state.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

	user;
	expiryDate;

  constructor(private spotifyService: SpotifyService,
              private userStateService: UserStateService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.userStateService.getUser();
  	this.expiryDate = this.spotifyService.getTokenExpiry();
  }

  authorize() {
  	this.spotifyService.authorize();
  }

  getMe() {
  	return this.spotifyService.getUser();
  }

  isLoggedInToSpotify() {
  	return this.spotifyService.isLoggedInToSpotify();
  }

  trySync(event) {
    this.spotifyService.trySync();
  }

}
