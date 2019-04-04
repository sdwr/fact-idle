import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RoomService } from '../server/room.service';
import { UserService } from '../server/user.service';

import { Room } from '../dtos/room';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

	rooms: Room[];

  constructor(private roomService: RoomService,
  						private userService: UserService,
  						private router: Router) {}

  ngOnInit() {
  	this.rooms = this.roomService.getAllRooms();
  }

  selectRoom(room: Room) {
  	let user = userService.user;
  	user.roomId = room._id;
  	this.userService.updateUser(user)
  		.subscribe(() => this.router.navigate(['/home']));
  }

}
