import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private token: string;
  private headers: HttpHeaders;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = authService.getUserToken();
    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
  }

  getAllTeachers() {
    return this.http.get(`${environment.apiUrl}/api/admin/teacher`, {
      headers: this.headers,
    });
  }

  addTeacher(teacher: object) {
    return this.http
      .post(`${environment.apiUrl}/api/admin/teacher`, teacher, {
        headers: this.headers,
      })
      .subscribe(
        (response: any) => {
          console.log(response);

          if (response.status == 200) {
            sessionStorage.setItem(
              'teacherCreatedSuccessFully',
              response.message
            );
            window.location.reload();
          }
        },
        (errors: any) => {
          console.log(errors);
          sessionStorage.setItem('errorMessage', errors.error.message);
          window.location.reload();
        }
      );
  }
}
