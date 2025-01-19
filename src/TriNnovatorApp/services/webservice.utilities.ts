import { Injectable } from '@angular/core';
// import { IterationService } from '../services/iteration.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface HttpError {
  status: number;
  message: string;
  error?: any;
}

@Injectable({
  providedIn: 'root',
})
export class WebServiceUtilities {
  private iteration = '';
  private userName = '';
  private access_token='';
  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  public loadFromLocalStorage() {
    // this.iteration = localStorage.getItem('iteration') || '';
    // this.userName = localStorage.getItem('userName') || '';
  }

  public updateSession(iteration: string, userName: string) {
    this.iteration = iteration;
    this.userName = userName;
    localStorage.setItem('iteration', iteration);
    localStorage.setItem('userName', userName);
  }

  public updateSessionToken(access_token: string) {
    this.access_token = access_token;
    localStorage.setItem('access_token', access_token);
  }

  
  public getIteration(): string {
    return this.iteration;
  }

  public getUserName(): string {
    return this.userName;
  }

  public getAccessToken(): string {
    return this.access_token;
  }

  public getData<T>(
    url: string,
    headers?: HttpHeaders,
    params?: HttpParams
  ): Observable<T> {
    const combinedParams = params
      ? params.append('iteration', this.iteration)
      : new HttpParams().append('iteration', this.iteration);

    const combinedHeaders = headers
      ? headers.append('iteration', this.iteration)
      : new HttpHeaders().append('iteration', this.iteration);

    return this.http
      .get<T>(url, { headers: combinedHeaders, params: combinedParams })
      .pipe(catchError(this.handleError));
  }

  public postData<T>(
    url: string,
    body: any = {},
    headers?: HttpHeaders
  ): Observable<T> {

    // headers = headers.append('iteration', this.iteration.toString());
    const options = {headers};

    return this.http.post<T>(url, body, options).pipe(catchError(this.handleError));
  }

  public getData_ARAS<T>(
    url: string,
    headers?: HttpHeaders
  ): Observable<T> {

    // headers = headers.append('iteration', this.iteration.toString());
    const options = {headers};

    return this.http.get<T>(url, options).pipe(catchError(this.handleError));
  }

  public updateData<T>(url: string, body: any = {}): Observable<T> {
    return this.http.put<any>(url, body).pipe(catchError(this.handleError));
  }

  public deleteData<T>(
    url: string,
    body: any = {},
    headers?: HttpHeaders
  ): Observable<T> {
    if (!headers) {
      headers = new HttpHeaders();
    }
    headers = headers.append('iteration', this.iteration);

    // (!body?.hasOwnProperty("iteration")) && (body["iteration"] = this.iteration);

    return this.http
      .delete<T>(url, { headers: headers, body: body })
      .pipe(catchError(this.handleError));
  }

  public resolveConflict<T>(
    url: string,
    body: any = {},
    headers?: HttpHeaders
  ): Observable<T> {
    if (!headers) {
      headers = new HttpHeaders();
    }
    headers = headers.append('iteration', this.iteration);

    // (!body?.hasOwnProperty("iteration")) && (body["iteration"] = this.iteration);

    return this.http
      .delete<T>(url, { headers: headers, body: body })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred. Handle it accordingly.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Error Code: ${error.status}, Message: ${error.message}`;
    }
    console.error(errorMessage);
    // You can return a custom error observable here for centralized error handling
    return throwError(errorMessage);
  }

  public getExtractedData<T>(
    url: string,
    headers?: HttpHeaders,
    params?: HttpParams
  ): Observable<T> {
    const combinedParams = params;

    const combinedHeaders = headers;
    return this.http
      .get<T>(url, { headers: combinedHeaders, params: combinedParams })
      .pipe(catchError(this.handleError));
  }

  public extractedData<T>(
    combinedParams: any,
    url: string,
    headers?: HttpHeaders,
    params?: HttpParams
  ): Observable<T> {
    return this.http
      .post<T>(url, combinedParams, { headers, params })
      .pipe(catchError(this.handleError));
  }
}
