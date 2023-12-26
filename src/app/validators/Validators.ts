import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";

export class CustomValidators {

  static ValidatePasswordMatching(control: AbstractControl) {
    if (control) {
      const password = control.get('password');
      const password2 = control.get('password2');

      if (password?.value !== password2?.value) {
        control.get('password2')?.setErrors({ mismatch: true });
        return { mismatch: true };
      }
    }
    return null;
  }
}
