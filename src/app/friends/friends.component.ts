import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pangolin } from '../models/pangolin';
import { pangolinService } from '../services/pangolin.service';
import { LoginService } from '../services/login.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent {
  pangolin$!: Observable<Pangolin[]>;
  pangolinArray: Pangolin[] = [];
  pangolinId = '';
  pangolinFriends: string[] = [];
  constructor(
    private pangolinService: pangolinService,
    private loginService: LoginService
  ) {}

  /* Makes a request for all pangolins  */
  ngOnInit() {
    this.pangolin$ = this.pangolinService.pangolin$;
    this.pangolinService.getPangolins();
    this.pangolin$.subscribe((data: Pangolin[]) => {
      this.pangolinArray = data;
    });
    this.pangolinFriends = this.loginService.pangolinFriends;
  }

  /* Makes a request with 2 names to unfriend */
  onClick(friendName: string) {
    this.pangolinId = this.loginService.pangolinId;

    this.pangolinService
      .friendPangolin(this.pangolinId, friendName)
      .subscribe();

    this.loginService.socialChange(friendName);
  }
}
