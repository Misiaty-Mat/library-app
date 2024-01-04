import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ResToken } from '../models/resToken';
import { LoginDetails } from '../models/loginDetails';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { RegisterDetails } from '../models/registerDetails';
import { User } from '../models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | null = null;

  constructor(private apiService: ApiService) { }

  getUser(): Observable<User | null> {
    if (this.user) {
      return of(this.user)
    }

    const token = localStorage.getItem("Token");
    if (token) {
      return this.setSession({token: token})
    }

    return of(null)
  }

  setuser(user: User) {
    this.user = user;
  }

  login(loginDetails: LoginDetails) {
    return this.apiService.login(loginDetails).pipe(
      map(token => this.setSession(token))
    );
  }

  register(registerDetails: RegisterDetails) {
    return this.apiService.register(registerDetails).pipe(
      map(token => this.setSession(token))
    );
  }

  logout() {
    localStorage.removeItem("Token");
    this.user = null;
  }

  private setSession(res: ResToken) {
    localStorage.setItem("Token", res.token);
    return this.apiService.me(res.token).pipe(
      catchError(this.logoutOnError)
    );
  }

  private logoutOnError(err: any): Observable<any> {
    if (err.error instanceof HttpErrorResponse) {
      this.logout()
    }
    return throwError(() => {});
  }
}
