import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private apiService: ApiService) { }

  listBooks(category?: string) {
    return this.apiService.getBooks().pipe(
      map(books => books.filter(book => category ? book.category === category : true))
    )
  }

  borrowBook(bookId: string) {
    return this.apiService.borrowBook(bookId);
  }

  listCategories() {
    return this.apiService.getCategories()
  }

}
