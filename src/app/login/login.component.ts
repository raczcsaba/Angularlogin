import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../user';
import {Token} from "@angular/compiler";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
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
    this.user.name = this.profileForm.value.name;
    this.user.password = this.profileForm.value.pw;
    this.authenticationService.login(this.user).subscribe(res => {
      console.log(res["data"]);
    })
  }
}
