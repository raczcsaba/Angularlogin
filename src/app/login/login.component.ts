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
      let flenght;
      if(this.user.name>=this.user.password)
        flenght=this.user.name.length;
      else
        flenght=this.user.password.length;
      let userlenght = 0;
      let pwlenght = 0;
      for (let i = 0; i < flenght; i++){
        console.log("ciklus alkalom:" + i);
        if (this.user.name[userlenght]!=undefined) {
          mix += this.user.name[userlenght];
          userlenght++;
        }
        if (this.user.password[pwlenght]!=undefined) {
          mix += this.user.password[pwlenght];
          pwlenght++;
        }
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
