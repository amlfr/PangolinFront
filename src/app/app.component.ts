import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'pangolin-friends';
  isConnected: boolean = false;
  pangolinId: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.loginService.isConnected$.subscribe((value: boolean) => {
      this.isConnected = value;
      this.router.navigate(['/social']);
      this.pangolinId = this.loginService.pangolinId;
    });
  }
}
