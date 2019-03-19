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
    if (!this.user) {
      this.router.navigate(['/login']);
    }
    this.getMe().then(me => this.user=me);
  	this.expiryDate = this.getCurrentToken();
  }

  authorize() {
  	this.spotifyService.authorize();
  }

  getMe() {
  	return this.spotifyService.getUser();
  }

  getCurrentToken() {
  	return this.spotifyService.getCurrentToken();
  }

}
