import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { LoginDetails } from '../models/loginDetails';
import { APP_SERVICE_CONFIG } from '../apiConfig/appConfig.service';
import { AppConfig } from '../apiConfig/appConfig.interface';
import { ResToken } from '../models/resToken';
import { Book } from '../models/book';
import { RegisterDetails } from '../models/registerDetails';
import { User } from '../models/user';
import { Loan } from '../models/loan';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token: string = '';

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private httpClient: HttpClient
  ) {}

  login(loginDetails: LoginDetails): Observable<ResToken> {
    return this.httpClient.post<ResToken>('https://localhost:8443/api/v1/auth/authenticate', JSON.stringify(loginDetails), {headers: this.getHeaders()});
  }

  register(registerDetails: RegisterDetails): Observable<ResToken> {
    return this.httpClient.post<ResToken>('https://localhost:8443/api/v1/auth/register', JSON.stringify(registerDetails), {headers: this.getHeaders()});
  }

  setToken(token: string) {
    this.token = token;
  }

  me(): Observable<User> {
    return this.httpClient.get<User>('https://localhost:8443/api/v1/user/me', this.getAuthHeaders())
    .pipe(
      shareReplay()
     );
  }

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>('https://localhost:8443/api/v1/books')
    .pipe(
      shareReplay(),
      catchError(this.processError)
     )
  }

  addBook(book: Book) {
    return this.httpClient.post('https://localhost:8443/api/v1/books', JSON.stringify(book), this.getAuthHeaders())
    .pipe(
      shareReplay(),
      catchError(this.processError)
     );
  }

  getCategories() {
    return this.httpClient.get('https://localhost:8443/api/v1/books/categories')
    .pipe(
      shareReplay(),
      catchError(this.processError)
     );
  }

  borrowBook(bookId: string) {
    return this.httpClient.post('https://localhost:8443/api/v1/loans', JSON.stringify({book_id: bookId}), this.getAuthHeaders())
    .pipe(
      shareReplay(),
      catchError(this.processError)
     );
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('https://localhost:8443/api/v1/user/list', this.getAuthHeaders())
    .pipe(
      shareReplay(),
      catchError(this.processError)
     );
  }

  deleteUser(userId: string) {
    return this.httpClient.delete('https://localhost:8443/api/v1/user/' + userId, this.getAuthHeaders())
    .pipe(
      catchError(this.processError)
     );
  }

  getAllLoans(): Observable<Loan[]> {
    return this.httpClient.get<Loan[]>('https://localhost:8443/api/v1/loans', this.getAuthHeaders())
    .pipe(
      shareReplay(),
      catchError(this.processError)
     );
  }

  getMyLoans(): Observable<Loan[]> {
    return this.httpClient.get<Loan[]>('https://localhost:8443/api/v1/loans/my', this.getAuthHeaders())
    .pipe(
      shareReplay(),
      catchError(this.processError)
     );
  }

  returnBookFromLoan(loanId: string) {
    return this.httpClient.delete('https://localhost:8443/api/v1/loans/' + loanId, this.getAuthHeaders())
    .pipe(
      catchError(this.processError)
     );
  }

  private getAuthHeaders() {
    return {headers: this.getHeaders(), withCredentials: true}
  }

  private getHeaders() {
    const heders = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.token ? heders.append('Authorization', `Bearer ${this.token}`) : heders
  }

  private processError(err: any): Observable<any> {
    console.error(err)
    let message = '';

    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    return throwError(() => {
      message;
    });
  }
}
