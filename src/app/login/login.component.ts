import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User | undefined;
  loading = false;
  submitted = false;
  error = '';
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


  onSubmit() {this.submitted = true;

    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }
    this.loading = true;
    console.log("Sikeres vaalidáció");
    this.authenticationService.login(this.profileForm.value.name,this.profileForm.value.pw);
  }
}
