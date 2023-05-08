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

  ngOnInit() {
    this.currentRole = this.loginService.pangolinRole;
    console.log('currentRole', this.currentRole);
  }

  onClick(role: string) {
    this.pangolinId = this.loginService.pangolinId;
    console.log('pangolinId', this.pangolinId);
    this.pangolinService.changeRole(this.pangolinId, role).subscribe();
    this.currentRole = role;
    this.loginService.pangolinRole = role;
  }
}
