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
  req: Request | undefined;


  constructor(private http: HttpClient) {
  }

  //public get currentUserValue(): User {
    //return this.currentUserSubject.value;
  //}

  login(user:User) {

    this.http.post<Request>(`${environment.apiUrl}/api/login`,user,{observe: 'body'})
      .subscribe(data => this.req = {
        'error': data.error,
        'message': data.message,
        'data': data.data,
      });
    return this.req;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
