import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {DataStreamService} from "../data-stream.service";

@Component({
  selector: 'app-spotify-pending',
  templateUrl: './spotify-pending.component.html',
  styleUrls: ['./spotify-pending.component.scss']
})
export class SpotifyPendingComponent implements OnInit {

	pendingSongs$: Observable<any[]>;

  constructor(private dataStreamService: DataStreamService) {
  }

  ngOnInit() {
    this.pendingSongs$ = this.dataStreamService.getSongQueue();
  }

}
