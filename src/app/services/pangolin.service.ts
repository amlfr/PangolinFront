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

  getPangolins() {
    return this.http
      .get<Pangolin[]>('http://localhost:3000/api/pangolin')
      .pipe(tap((pangolins) => this.pangolin$.next(pangolins)))
      .subscribe();
  }

  createPangolin(pangolin: Pangolin): Observable<Pangolin> {
    return this.http
      .post<Pangolin>('http://localhost:3000/api/pangolin', pangolin)
      .pipe(catchError(this.handleError));
  }

  connectPangolin(pangolin: Pangolin): Observable<Pangolin> {
    return this.http
      .post<Pangolin>('http://localhost:3000/api/pangolin/login', pangolin)
      .pipe(catchError(this.handleError));
  }

  friendPangolin(pangolinId: string, friendName: string) {
    const requestBody = { pangolinId, friendName };
    return this.http
      .post('http://localhost:3000/api/pangolin/friend', requestBody)
      .pipe(catchError(this.handleError));
  }

  changeRole(pangolinId: string, role: string) {
    const requestBody = { pangolinId, role };
    return this.http
      .post('http://localhost:3000/api/pangolin/role', requestBody)
      .pipe(catchError(this.handleError));
  }
}
