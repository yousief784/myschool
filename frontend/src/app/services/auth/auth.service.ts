import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private headers: HttpHeaders;
  private token: any;

  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  userRole() {
    return localStorage.getItem('role');
  }

  isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }

  login(body: string) {
    return this.http
      .post(`${environment.apiUrl}/api/users/auth/login`, body, {
        headers: this.headers,
      })
      .subscribe(
        (response: any) => {
          if (response.status !== 200) return;
          this.token = response.token;
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          this.router.navigate([`${response.role}`]).then(() => {
            window.location.reload();
          });
        },
        (errors: any) => {
          if (errors.error.status !== 400) return;
          sessionStorage.setItem('loginError', errors.error.message);
          window.location.reload();
        }
      );
  }

  logout() {
    return this.http
      .post(
        `${environment.apiUrl}/api/users/auth/logout`,
        {},
        {
          headers: this.headers.set('Authorization', `Bearer ${this.token}`),
        }
      )
      .subscribe(
        (response: any) => {
          if (response.status !== 200) return;
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('userId');
          this.router.navigate(['/']);
        },
        (error: any) => {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('userId');
          this.router.navigate(['/']);

          console.log(error);
        }
      );
  }

  getUserToken() {
    return this.token;
  }
}
