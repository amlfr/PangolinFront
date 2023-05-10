import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Pangolin } from '../models/pangolin';
import { pangolinService } from '../services/pangolin.service';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  pangolin$!: Observable<Pangolin[]>;
  pangolinArray: Pangolin[] = [];
  pangolinId: string = '';
  pangolinFriends: string[] = [];
  pangolinName!: string;

  constructor(
    private pangolinService: pangolinService,
    private loginService: LoginService
  ) {}

  //Recuperating variables and observables  before sending http request for all pangolins
  ngOnInit() {
    this.pangolinId = this.loginService.pangolinId;
    this.pangolin$ = this.pangolinService.pangolin$;
    this.pangolinService.getPangolins();

    this.pangolinFriends = this.loginService.pangolinFriends;
    this.pangolinName = this.loginService.pangolinName;
  }

  //Sends a http request with 2 pangolins names to add a friend
  onClick(friendName: string) {
    this.pangolinId = this.loginService.pangolinId;
    this.pangolinService
      .friendPangolin(this.pangolinId, friendName)
      .subscribe();
    this.loginService.socialChange(friendName);
  }
}
