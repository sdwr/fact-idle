import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {DataStreamService} from "../data-stream.service";

@Component({
  selector: 'app-users-online',
  templateUrl: './users-online.component.html',
  styleUrls: ['./users-online.component.scss']
})
export class UsersOnlineComponent implements OnInit {

	userList$: BehaviorSubject<any[]>;

  constructor(private dataStreamService: DataStreamService) { }

  ngOnInit() {
  	this.userList$ = this.dataStreamService.getUserList();
  }

}
