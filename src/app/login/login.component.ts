import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../validators/Validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: [
        '',
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.email],
        },
      ],
      password: ['', Validators.required],
    });
  }

  login() {
    const formValues = this.form.value;
    this.loginService.login(formValues.email, formValues.password).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => {
        this._snackBar.open(
          'We could not found user with this email and password.',
          'Ok'
        );
        this.form.reset({
          email: formValues.email,
          password: '',
        });
      },
    });
  }
}
