import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegisterDetails } from '../models/registerDetails';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private authService: AuthService) { }

  register(email: string, password: string, name: string, surname: string) {
    const registerDetails: RegisterDetails = {
      email: email,
      password: password,
      name: name,
      surname: surname
    }

    return this.authService.register(registerDetails);
  }
}
