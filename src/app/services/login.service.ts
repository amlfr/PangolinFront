import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Pangolin } from 'src/app/models/pangolin';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}
  pangolinId = '';
  pangolinFriends: string[] = [];
  isConnected = false;
  isConnectedSubject = new Subject<boolean>();
  isConnected$ = this.isConnectedSubject.asObservable();
  pangolinRole = '';
  pangolinName = '';
  pangolin$!: Observable<Pangolin[]>;
  pangolinArray: Pangolin[] = [];

  /* Sets up a number of variables in this service when called to share around */
  emitConnection(
    value: boolean,
    idValue: string,
    friends: string[],
    role: string,
    name: string
  ) {
    this.isConnectedSubject.next(value);
    this.isConnected = value;
    this.pangolinId = idValue;
    this.pangolinFriends = friends;
    this.pangolinRole = role;
    this.pangolinName = name;
  }

  /* Modifies an array of string when called and either deletes the target string if found or adds it otherwise */
  socialChange(friendName: string) {
    if (this.pangolinFriends.includes(friendName)) {
      const index = this.pangolinFriends.indexOf(friendName);
      if (index !== -1) {
        this.pangolinFriends.splice(index, 1);
      }
    } else {
      this.pangolinFriends.push(friendName);
    }
  }
}
