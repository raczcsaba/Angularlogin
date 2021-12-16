import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User | undefined;
  profileForm = new FormGroup({
    name: new FormControl(''),
    pw: new FormControl(''),
  });
//remember me
  //bas64 localcucc felh jelszo
  //minimum hossz validator

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,

  ) { }


  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      pw: ['', Validators.required]
    });
  }


  onSubmit() {
//interface
    this.user = {'name':this.profileForm.value.name,'password':this.profileForm.value.pw};

    let token = this.authenticationService.login(this.user);
    console.log(token?.error);
  }
}
