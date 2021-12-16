import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profileForm = new FormGroup({
    name: new FormControl(''),
    pw: new FormControl(''),
  });

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

    this.authenticationService.login(this.profileForm.value.name,this.profileForm.value.pw);
  }
}
