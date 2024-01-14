import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomValidators } from '../validators/Validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private registerService: RegisterService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group(
      {
        email: ['', { validators: [Validators.required, Validators.email] }],
        password: [
          '',
          { validators: [Validators.required, Validators.minLength(6)] },
        ],
        password2: ['', Validators.required],
        name: ['', Validators.required],
        surname: ['', Validators.required],
      },
      {
        validators: [CustomValidators.ValidatePasswordMatching],
      }
    );
  }

  register() {
    const formValues = this.form.value;
    this.registerService
      .register(
        formValues.email,
        formValues.password,
        formValues.name,
        formValues.surname
      )
      .subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (e) => {
          this._snackBar.open('Something went wrong.', 'Ok');
          this.form.reset({
            email: formValues.email,
            password: '',
            password2: '',
            name: formValues.name,
            surname: formValues.surname,
          });
        },
      });
  }
}
