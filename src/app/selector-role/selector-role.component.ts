import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pangolin } from '../models/pangolin';
import { pangolinService } from '../services/pangolin.service';
import { LoginService } from '../services/login.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selector-role',
  templateUrl: './selector-role.component.html',
  styleUrls: ['./selector-role.component.scss'],
})
export class SelectorClassComponent {
  pangolinId = '';
  currentRole = '';

  constructor(
    private loginService: LoginService,
    private pangolinService: pangolinService
  ) {}

  /* Gets back the role of the pangolin from the login service */
  ngOnInit() {
    this.currentRole = this.loginService.pangolinRole;
  }

  /* Sends a http request when clicked with the role and id attached to construct request */
  onClick(role: string) {
    this.pangolinId = this.loginService.pangolinId;
    this.pangolinService.changeRole(this.pangolinId, role).subscribe();
    this.currentRole = role;
    this.loginService.pangolinRole = role;
  }
}
