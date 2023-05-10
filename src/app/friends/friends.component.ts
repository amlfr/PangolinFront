import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Pangolin } from '../models/pangolin';
import { pangolinService } from '../services/pangolin.service';
import { LoginService } from '../services/login.service';

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

    this.pangolinFriends = this.loginService.pangolinFriends;
  }

  ngOnChanges() {}

  /* Makes a request with 2 names to unfriend */
  onClick(friendName: string) {
    this.pangolinId = this.loginService.pangolinId;

    this.pangolinService
      .friendPangolin(this.pangolinId, friendName)
      .subscribe();

    this.loginService.socialChange(friendName);
  }
}
