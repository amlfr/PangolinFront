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
  isConnected!: boolean;
  pangolinId!: string;
  showRole = false;
  currentRole!: string;
  pangolinName!: string;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.pangolinId = this.loginService.pangolinId;
    if (this.loginService.isConnected === false) {
      this.router.navigate(['']);
    }
    this.pangolinName = this.loginService.pangolinName;
  }
  toggleRole() {
    this.showRole = !this.showRole;
  }
  disconnect() {
    this.loginService.isConnected = false;
    this.router.navigate(['']);
  }
}
