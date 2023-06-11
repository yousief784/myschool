import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private token: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = authService.getUserToken();
    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
  }

  getUserData() {
    return this.http.get(`${environment.apiUrl}/api/users/auth/show`, {
      headers: this.headers
    });
  }

  getUserId() {
    return localStorage.getItem('userId');
  }
}
