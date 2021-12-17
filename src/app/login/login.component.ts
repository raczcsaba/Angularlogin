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
      mix = mix.split("").reverse().join("");
      this.user = new User();
      let _i = 0;
      while (mix[_i] != "|"){
        if (_i%2==0){
          this.user.name+=mix[_i];
        }
        else {
          this.user.password+=mix[_i];
        }
        _i++;
      }
      _i++;
      let sep = _i%2;
      let end = "";
      for (_i; _i < mix.length; _i++){
        end+=mix[_i];
      }
      if(!sep){
        this.user.name+=end;
      }
      else {
        this.user.password+=end;
      }
      this.profileForm.setValue({'name':this.user.name,'pw':this.user.password,'check':true});
      console.log(mix  + " " + this.user.name + " " + this.user.password);
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
      let sep = false;
      for (let i = 0; i < flenght; i++){
        if(!(this.user.name[i] ?? "")&&!sep){
          mix+="|";
          sep=true;
        }
        if(!(this.user.password[i] ?? "")&&!sep){
          mix+="|";
          sep=true;
        }
        mix += (this.user.name[i] ?? "") + (this.user.password[i] ?? "");

      }
      console.log(mix);
      mix = mix.split("").reverse().join("");
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
