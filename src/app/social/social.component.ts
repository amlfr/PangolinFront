import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent {
  pangolinId!: string;
  showRole = false;
  pangolinName!: string;

  /*  @Input() newFriend!: boolean; */

  constructor(private loginService: LoginService, private router: Router) {}

  /* Sets up the id and name of the user as variables and checks if the user is connected through the login service, redirects to the home page if he isn't */
  ngOnInit() {
    this.pangolinId = this.loginService.pangolinId;
    this.pangolinName = this.loginService.pangolinName;
    if (this.loginService.isConnected === false) {
      this.router.navigate(['']);
    }
  }

  /* Toggles the role selector component */
  toggleRole() {
    this.showRole = !this.showRole;
  }

  /* Sets the connected variable in the login service to false then redirects to the home page */
  disconnect() {
    this.loginService.isConnected = false;
    this.router.navigate(['']);
  }

  /* onNewFriend(newFriend: boolean) {
    this.newFriend = newFriend;
    console.log('onNewFriend', newFriend);
  } */
}
