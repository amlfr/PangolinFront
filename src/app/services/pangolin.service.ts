import { Injectable, ErrorHandler } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError, Subject, tap } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Pangolin } from '../models/pangolin';

@Injectable({
  providedIn: 'root',
})
export class pangolinService {
  /* http header for sending JSON data */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  pangolin$ = new Subject<Pangolin[]>();

  constructor(private http: HttpClient) {}

  /* Sends a get request for all pangolins in the DB */
  getPangolins() {
    return this.http
      .get<Pangolin[]>('http://localhost:3000/api/pangolin')
      .pipe(tap((pangolins) => this.pangolin$.next(pangolins)))
      .subscribe();
  }

  /* Sends a request to create a new pangolin user */
  createPangolin(pangolin: Pangolin): Observable<Pangolin> {
    return this.http
      .post<Pangolin>('http://localhost:3000/api/pangolin', pangolin)
      .pipe(catchError(this.handleError));
  }

  /* Sends a request to login a user */
  connectPangolin(pangolin: Pangolin): Observable<Pangolin> {
    return this.http
      .post<Pangolin>('http://localhost:3000/api/pangolin/login', pangolin)
      .pipe(catchError(this.handleError));
  }

  /* Sends a request with 2 pangolin names and makes them friend or unfriend  */
  friendPangolin(pangolinId: string, friendName: string) {
    const requestBody = { pangolinId, friendName };
    return this.http
      .post('http://localhost:3000/api/pangolin/friend', requestBody)
      .pipe(catchError(this.handleError));
  }

  /* Sends a request to change the role of the user's pangolin */
  changeRole(pangolinId: string, role: string) {
    const requestBody = { pangolinId, role };
    return this.http
      .post('http://localhost:3000/api/pangolin/role', requestBody)
      .pipe(catchError(this.handleError));
  }
}
