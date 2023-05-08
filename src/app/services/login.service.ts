import { Injectable } from '@angular/core';

import { Observable, throwError, Subject, tap } from 'rxjs';

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

  emitConnection(
    value: boolean,
    idValue: string,
    friends: string[],
    role: string
  ) {
    this.isConnectedSubject.next(value);
    this.isConnected = value;
    this.pangolinId = idValue;
    this.pangolinFriends = friends;
    this.pangolinRole = role;
    console.log('role', this.pangolinRole);
  }

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
