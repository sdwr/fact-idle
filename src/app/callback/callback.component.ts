import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
  	private router: Router,
  	private spotifyService: SpotifyService) { }

  ngOnInit() {
  	let fragment = this.route.snapshot.fragment;
  	let fragMap = this.parseUrlFragment(fragment);

  	this.spotifyService.authResponse(fragMap);
  	this.router.navigate(['/home']);
  }

  parseUrlFragment(fragment: string) {
  	let fragArray = fragment.split(/[&=]/);
  	let pairArray = fragArray.map((x,i) => 
  		i % 2 === 1 ? [fragArray[i-1], fragArray[i]] as [string, string] : null
 		).filter(x => x);
  	return new Map(pairArray);
  }

}
