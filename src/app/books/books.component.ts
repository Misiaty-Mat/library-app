import { Component } from '@angular/core';
import { BooksService } from './books.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  bookList: Book[] | null = [];

  constructor(private booksService: BooksService) {}

  books$ = this.booksService.listBooks()
}
