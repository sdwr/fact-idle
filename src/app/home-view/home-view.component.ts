import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SpotifyService } from '../spotify.service';
import { UserService} from '../server/user.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

	user;
	expiryDate;

  constructor(private spotifyService: SpotifyService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.userService.user;
    if (!this.user) {
      this.router.navigate(['/login']);
    }
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

}
