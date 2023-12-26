import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private apiService: ApiService) { }

  listBooks() {
    return this.apiService.getBooks()
  }
}
