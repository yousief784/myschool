import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class parentChildrenService {
  private token: string;
  private headers: HttpHeaders;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = authService.getUserToken();
    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
  }

  getChildren() {
    return this.http.get(`${environment.apiUrl}/api/parent`, {
      headers: this.headers,
    });
  }

  getResult(studentId: string) {
    return this.http.get(
      `${environment.apiUrl}/api/parent/result/${studentId}`,
      { headers: this.headers }
    );
  }
}
