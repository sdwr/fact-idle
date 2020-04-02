import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataStreamService {
  private chatHistory$: BehaviorSubject<any[]>;
  private songQueue$: BehaviorSubject<any[]>;
  private currentSong$: BehaviorSubject<any>;

  private userList$: BehaviorSubject<any[]>;
  constructor() {
    this.currentSong$ = new BehaviorSubject(null);
    this.chatHistory$ = new BehaviorSubject([]);
    this.songQueue$ = new BehaviorSubject([]);
    this.userList$ = new BehaviorSubject([]);
  }

  getChatHistory() {
    return this.chatHistory$;
  }

  setChatHistory(history: any[]) {
    this.chatHistory$.next(history);
  }

  addMessage(payload) {
    let history = this.chatHistory$.value;
    history.push({user: payload.user, message: payload.message});
    this.chatHistory$.next(history);
  }

  getSongQueue() {
    return this.songQueue$;
  }

  setSongQueue(queue) {
    this.songQueue$.next(queue);
  }

  getCurrentSong() {
    return this.currentSong$;
  }

  setCurrentSong(songObj) {
    this.currentSong$.next(songObj);
  }

  getUserList() {
    return this.userList$;
  }

  setUserList(payload) {
    this.userList$.next(payload);
  }


}
