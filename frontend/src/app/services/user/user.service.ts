import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserData() {
    return this.http.get(`${environment.apiUrl}/api/users/auth/show`, {
      headers: this.headers.set(
        'Authorization',
        `Bearer ${this.authService.getUserToken()}`
      ),
    });
  }

  getUserId() {
    return localStorage.getItem('userId');
  }
}
