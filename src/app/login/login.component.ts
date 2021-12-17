import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../user';
import {Token} from "@angular/compiler";
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  hiba: string = "";
  profileForm = new FormGroup({
    name: new FormControl(''),
    pw: new FormControl(''),
    check: new FormControl(Boolean)
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
      pw: ['', Validators.required],
      check: [false]
    });
  }

  closeBtn(){
      this.hiba="";
  }

  onClick() {
    this.user.name = this.profileForm.value.name;
    this.user.password = this.profileForm.value.pw;

    //remember me
    if (this.profileForm.value.check){
      let mix = "";
      console.log("name + pw hossza:"+(this.user.name.length +  this.user.password.length));
      for (let _i = 0; _i < this.user.name.length +  this.user.password.length; _i++){
        console.log("ciklus alkalom:" + _i);
        if (this.user.name[_i]!=undefined)
          mix += this.user.name[_i];
        if (this.user.password[_i]!=undefined)
          mix += this.user.password[_i];
      }
      console.log("mix hossza: "+mix.length);
      console.log("mix: "+mix);

      mix = mix.split("").reverse().join("");
      mix = btoa(unescape(encodeURIComponent( mix )));
      localStorage.setItem('rememberme',mix);
      //console.log(localStorage.getItem('rememberme'))
    }


    //token auth
    this.authenticationService.login(this.user).subscribe(res => {
      console.log(res["data"]);
    },
      error => {
        console.log(JSON.stringify(error.error["error"]));
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          this.hiba = 'Hálózati hiba történt' + JSON.stringify(error.error);
        } else {
          this.hiba = JSON.stringify(error.error["error"]);
        }
      })
  }
}
