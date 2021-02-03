import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { authData, formData, listItems, loginData } from '../models/data.model';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(data: formData): Observable<string> {
    return this.http
      .post<loginData>('http://localhost:3000/api/login', data)
      .pipe(
        map((res) => {
          sessionStorage.setItem('token', res.token);
          sessionStorage.setItem('email', res.email);
          return 'success, token stored in client storage';
        })
      );
  }

  verifyToken(): Observable<boolean> {
    return this.http
      .get<authData>('http://localhost:3000/api/verifytoken')
      .pipe(
        map((body: authData) => {
          return true;
        }),
        catchError((errRes: HttpErrorResponse) => {
          return of(false);
        })
      );
  }

  getData(): Observable<listItems> {
    return this.http.get<listItems>('http://localhost:3000/api/getdata');
  }
}
