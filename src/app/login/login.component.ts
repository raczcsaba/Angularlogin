import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { FormGroup, FormControl } from '@angular/forms';

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

  constructor() { }


  ngOnInit(): void {

  }


  onSubmit() {
    // TODO: adatok user formatumban kuldese, validalasa
    console.warn(this.profileForm.value);
  }
}
