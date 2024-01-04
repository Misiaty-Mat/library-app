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

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private httpClient: HttpClient
  ) {}

  getHeaders(token?: string) {
    const heders = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return token ? heders.append('Authorization', `Bearer ${token}`) : heders
  }

  login(loginDetails: LoginDetails): Observable<ResToken> {
    return this.httpClient.post<ResToken>('https://localhost:8443/api/v1/auth/authenticate', JSON.stringify(loginDetails), {headers: this.getHeaders()})
    .pipe(
      catchError(this.processError)
    );
  }

  register(registerDetails: RegisterDetails): Observable<ResToken> {
    return this.httpClient.post<ResToken>('https://localhost:8443/api/v1/auth/register', JSON.stringify(registerDetails), {headers: this.getHeaders()})
    .pipe(
      catchError(this.processError)
    );
  }

  me(token: string): Observable<User> {
    return this.httpClient.get<User>('https://localhost:8443/api/v1/user/me', {headers: this.getHeaders(token), withCredentials: true});
  }

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>('https://localhost:8443/api/v1/books')
    .pipe(
      shareReplay(),
      catchError(this.processError)
     )
  }

  private processError(err: any): Observable<any> {
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
