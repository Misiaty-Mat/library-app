import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ResToken } from '../models/resToken';
import { LoginDetails } from '../models/loginDetails';
import { Observable, map } from 'rxjs';
import { RegisterDetails } from '../models/registerDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false

  constructor(private apiService: ApiService) { }

  login(loginDetails: LoginDetails): Observable<void> {
    return this.apiService.login(loginDetails).pipe(
      map(token => this.setSession(token))
    );
  }

  register(registerDetails: RegisterDetails): Observable<void> {
    return this.apiService.register(registerDetails).pipe(
      map(token => this.setSession(token))
    );
  }

  logout() {
    localStorage.removeItem("Token");
    this.isLoggedIn = false;
  }

  private setSession(res: ResToken) {
    localStorage.setItem("Token", res.token);
    this.isLoggedIn = true;
  }
}
