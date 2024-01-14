import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../models/book';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService, private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      name: ['', {validators: [Validators.required]}],
      author: ['', {validators: [Validators.required]}],
      category: ['', {validators: [Validators.required]}],
      tag: ['', {validators: [Validators.required]}],
      isbn: ['', {validators: [Validators.required]}]
    })
  }

  add() {
    const formValues = this.form.value;
    const book: Book = {
      id: '',
      name: formValues.name,
      author: formValues.author,
      category: formValues.category,
      tag: formValues.tag,
      isbn: formValues.isbn,
      available: true
    }

    this.apiService.addBook(book).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (e) => {
        this._snackBar.open('Something went wrong.', 'Ok');
      },
    });
  }
}
