import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pangolin } from '../models/pangolin';
import { pangolinService } from '../services/pangolin.service';
import { LoginService } from '../services/login.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  pangolin$!: Observable<Pangolin[]>;
  pangolinArray: Pangolin[] = [];
  pangolinId = '';
  pangolinFriends: string[] = [];
  constructor(
    private pangolinService: pangolinService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.pangolin$ = this.pangolinService.pangolin$;
    this.pangolinService.getPangolins();
    this.pangolin$.subscribe((data: Pangolin[]) => {
      this.pangolinArray = data;
    });
    this.pangolinFriends = this.loginService.pangolinFriends;
  }

  onClick(friendName: string) {
    this.pangolinId = this.loginService.pangolinId;
    this.pangolinService
      .friendPangolin(this.pangolinId, friendName)
      .subscribe();
    this.loginService.socialChange(friendName);
  }
}
