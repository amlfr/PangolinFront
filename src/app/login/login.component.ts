import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { pangolinService } from 'src/app/services/pangolin.service';
import { Pangolin } from 'src/app/models/pangolin';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  pangolinId: string = '';
  isConnected: boolean = false;

  constructor(
    private pangolinService: pangolinService,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  //Initializing the login form
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  //Send a http request when the button is clicked, then sends the connection informations to the login service
  onSubmit() {
    const pangolin: Pangolin = this.loginForm!.value;
    this.pangolinService.connectPangolin(pangolin).subscribe((res) => {
      if (res.pangolinId != undefined) {
        this.loginService.emitConnection(
          true,
          res.pangolinId,
          res.friends,
          res.role,
          res.name
        );
      }
    });
  }
}
