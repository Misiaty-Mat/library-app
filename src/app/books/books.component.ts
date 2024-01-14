import { Component, OnInit } from '@angular/core';
import { BooksService } from './books.service';
import { Book } from '../models/book';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  constructor(private booksService: BooksService, private authService: AuthService) {}

  books: Book[] = []
  selectedCategory: string = ''
  categories$ = this.booksService.listCategories()
  isLoggedIn = false;

  borrow(book: Book) {
    this.booksService.borrowBook(book.id).subscribe(
      () => this.booksService.listBooks().subscribe(books => this.books = books)
    );
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.isLoggedIn = user ? true : false
    })
    this.booksService.listBooks().subscribe(books => this.books = books)
  }

  filterBooks() {
    this.booksService.listBooks(this.selectedCategory).subscribe(books => this.books = books)
  }
}
