import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.pangolinId = this.loginService.pangolinId;
    if (this.loginService.isConnected === false) {
      this.router.navigate(['']);
    }
  }
  toggleRole() {
    this.showRole = !this.showRole;
  }
}
