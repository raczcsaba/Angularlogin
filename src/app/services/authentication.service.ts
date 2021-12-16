import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Request } from '../request';
import { User } from '../user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {


  constructor(private httpClient: HttpClient) {
  }

  //public get currentUserValue(): User {
    //return this.currentUserSubject.value;
  //}

  login(user?:User): Observable<any>{
   return this.httpClient.post(`${environment.apiUrl}/api/login`,user, {

   });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
