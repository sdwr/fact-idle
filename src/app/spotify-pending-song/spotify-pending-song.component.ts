import { Component, OnInit, Input } from '@angular/core';

import {Track} from '../dtos/track';

@Component({
  selector: 'app-spotify-pending-song',
  templateUrl: './spotify-pending-song.component.html',
  styleUrls: ['./spotify-pending-song.component.scss']
})
export class SpotifyPendingSongComponent implements OnInit {

	@Input() track: Track

  constructor() { }

  ngOnInit() {
  }

}
