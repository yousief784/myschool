import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private token: string;
  private headers: HttpHeaders;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = authService.getUserToken();
    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
  }

  getAllCourses() {
    return this.http.get(`${environment.apiUrl}/api/admin/course`, {
      headers: this.headers,
    });
  }

  getCoursesByClass(classId: string) {
    return this.http.get(
      `${environment.apiUrl}/api/student/course/${classId}`,
      {
        headers: this.headers,
      }
    );
  }

  addNewCourse(course: object) {
    return this.http
      .post(`${environment.apiUrl}/api/admin/course/create`, course, {
        headers: this.headers,
      })
      .subscribe(
        (response: any) => {
          console.log(response);

          if (response.status == 200) {
            sessionStorage.setItem(
              'courseCreatedSuccessFully',
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
