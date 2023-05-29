import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from 'src/app/services/auth/auth.service';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherReportService {

  private token: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = authService.getUserToken();
    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
  }

  generateReport() {
    return this.http.get(`${environment.apiUrl}/api/admin/report/teacher/generate-pdf`, {headers: this.headers})
  }

}
