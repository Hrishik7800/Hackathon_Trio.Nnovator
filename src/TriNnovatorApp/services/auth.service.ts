import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { API_BASE_URL } from '../../api.constants';
import { API_BASE_Iteration } from '../../api.constants';
import { API_BASE_URL_ARAS } from '../../api.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router: any;
  private loggedIn: boolean = false;
  constructor(private http: HttpClient) {}
  //login
  login(formData: any): Observable<any> {
    this.loggedIn = true;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    });

    // Convert formData into x-www-form-urlencoded format
    const body = new URLSearchParams();
    body.append('username', formData.userName);
    body.append('password', formData.password);
    body.append('grant_type', formData.grant_type);
    body.append('scope', formData.scope);
    body.append('client_id', formData.client_id);
    body.append('database', 'InnovatorSolutionsReleased31');
    body.append('Iteration','Test1');
      

    //endpoint
    return this.http
      .post(`${API_BASE_URL_ARAS}OAuthServer/connect/token`, body , { headers })
      .pipe(
        map((response: any) => {
          const { access_token } = response;

          localStorage.setItem('access_token', access_token);
          return response;
        })
      );
  }

  //TO GET TOPBAR ITERATION
  getTopbarIteration(): string {
    return localStorage.getItem('iteration') ?? '';
  }

  //logout
  logout(): Observable<any> {
    this.loggedIn = false;
    return this.http.delete(`${API_BASE_URL}api/logout`, {}).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  //iteration
  getIterations(): Observable<any[]> {
    return this.http.get<any[]>(API_BASE_Iteration);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
