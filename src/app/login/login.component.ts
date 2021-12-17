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

    //rememberme loading
    let mix = localStorage.getItem('rememberme');
    if(mix) {
      mix = decodeURIComponent(escape(atob(mix)));
      let uslenght = +mix.slice(mix.length - 2, mix.length);
      mix = mix.substring(0,mix.length-2);
      mix = mix.split("").reverse().join("");
      for (let i = 0; i < mix.length; i++){

      }
      console.log(mix + " és " + uslenght);
    }
  }

  closeBtn(){
      this.hiba="";
  }

  onClick() {
    this.user.name = this.profileForm.value.name;
    this.user.password = this.profileForm.value.pw;
    let checked = this.profileForm.value.check;

    //remember me
    if (this.profileForm.value.check){
      let mix = "";
      let flenght = this.user.password.length > this.user.name.length ? this.user.password.length : this.user.name.length;

      for (let i = 0; i < flenght; i++){

          mix += (this.user.name[i] ?? "") + (this.user.password[i] ?? "");
      }
      console.log(mix);
      mix = mix.split("").reverse().join("");
      if (this.user.name.length<10)
        mix+="0";
      mix+=this.user.name.length;
      mix = btoa(unescape(encodeURIComponent( mix )));
      localStorage.setItem('rememberme',mix);
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
      }, () => {
        if (!checked&&this.hiba=="")
          localStorage.removeItem('rememberme');
      })
  }
}
