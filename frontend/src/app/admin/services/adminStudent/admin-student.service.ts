import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminStudentService {
  private token: string;
  private headers: HttpHeaders;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = authService.getUserToken();
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
  }

  getAllStudentsInThisClass(classId: number) {
    return this.http.get(`${environment.apiUrl}/api/admin/student/${classId}`, {
      headers: this.headers,
    });
  }

  showStudentDetails(studentId: string) {
    return this.http.get(
      `${environment.apiUrl}/api/admin/student/show/${studentId}`,
      {
        headers: this.headers,
      }
    );
  }

  addNewStudent(student: object) {
    // const boundary = '----boundary-' + Math.random().toString(16).substr(2);
    const headers = new HttpHeaders()
      // .set(
      //   'Content-Type',
      //   `multipart/form-data; boundary=----WebKitFormBoundaryXYZ123`
      // )
      .set('Authorization', `Bearer ${this.token}`);
    console.log('from service: ', student);

    return this.http
      .post(`${environment.apiUrl}/api/admin/student/add-student`, student, {
        headers: headers,
      })
      .subscribe(
        (response: any) => {
          console.log(response);

          if (response.status == 200) {
            console.log('inside else if 200');

            sessionStorage.setItem(
              'studentAddedSuccessfully',
              response.message
            );
            // window.location.reload();
          }
        },
        (errors: any) => {
          console.log(errors);
          sessionStorage.setItem('studentAlreadyExist', errors.error.message);
          // window.location.reload();
        }
      );
  }

  deleteStudent(userId: string) {
    return this.http
      .delete(`${environment.apiUrl}/api/admin/student/${userId}`, {
        headers: this.headers,
      })
      .subscribe(
        (response: any) => {
          if (response.status == 200) {
            sessionStorage.setItem(
              'studentRemovedSuccessfully',
              response.message
            );
            window.location.reload();
          }
        },
        (errors: any) => {
          console.log(errors);
          sessionStorage.setItem('studentRemovedError', errors.error.message);
          window.location.reload();
        }
      );
  }
}
