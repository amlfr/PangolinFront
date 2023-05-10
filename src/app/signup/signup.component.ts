import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { pangolinService } from 'src/app/services/pangolin.service';
import { Pangolin } from 'src/app/models/pangolin';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';

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
  ];
  pangolin$!: Observable<Pangolin[]>;
  pangolinArray: Pangolin[] = [];

  /*  @Output() newFriend = new EventEmitter<boolean>(); */
  @Input() doBoth!: boolean;

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
      if (res.pangolinId != undefined && this.doBoth === false) {
        this.loginService.emitConnection(
          true,
          res.pangolinId,
          [],
          res.role,
          res.name
        );
      }
    });
    if (this.doBoth === true) {
      this.pangolinService
        .friendPangolin(
          this.loginService.pangolinId,
          this.pangolinForm.value.name
        )
        .subscribe(() => {
          setTimeout(() => {
            this.pangolinService.getPangolins();
          }, 1000);
        });
      this.loginService.socialChange(this.pangolinForm.value.name);
    }
  }
}
