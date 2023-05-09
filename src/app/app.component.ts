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

  constructor(private loginService: LoginService, private router: Router) {}

  /* Listen to the observable the tracks connection and redirects to social page when user is connected */
  ngOnInit() {
    this.loginService.isConnected$.subscribe((value: boolean) => {
      this.router.navigate(['/social']);
    });
  }
}
