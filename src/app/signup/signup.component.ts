import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { pangolinService } from 'src/app/services/pangolin.service';
import { Pangolin } from 'src/app/models/pangolin';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  pangolinForm!: FormGroup;
  roles: string[] = [
    'Guerrier',
    'Alchimiste',
    'Sorcier',
    'Espion',
    'Enchanteur',
  ]; /* 
  currentRole: string = ''; */
  /* pangolinId: string = '';
  isConnected: boolean = false; */

  @Output() connectionEvent = new EventEmitter<boolean>();

  constructor(
    private pangolinService: pangolinService,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  /* Initalizes the signup up form control */
  ngOnInit() {
    this.pangolinForm = this.formBuilder.group({
      name: [null, Validators.required],
      password: [null, Validators.required],
      role: [null, Validators.required],
    });
  }

  //Send a http request when the button is clicked, then sends the connection informations to the login service
  onSubmit() {
    const pangolin: Pangolin = this.pangolinForm!.value;
    this.pangolinService.createPangolin(pangolin).subscribe((res) => {
      if (res.pangolinId != undefined) {
        this.loginService.emitConnection(
          true,
          res.pangolinId,
          [],
          res.role,
          res.name
        );
      }
    });
  }
}
