import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LoginDetails } from '../models/loginDetails';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private authService: AuthService) { }

  login(email: string, password: string) {
    const loginDetails: LoginDetails = {
      email: email,
      password: password
    }
    return this.authService.login(loginDetails);
  }
}
