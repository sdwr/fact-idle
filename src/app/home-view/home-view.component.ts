import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

	user;
	expiryDate;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  	this.expiryDate = this.getCurrentToken();
  }

  authorize() {
  	this.spotifyService.authorize();
    this.getMe().then(me => this.user=me);
  }

  getMe() {
  	return this.spotifyService.getUser();
  }

  getCurrentToken() {
  	return this.spotifyService.getCurrentToken();
  }

}
