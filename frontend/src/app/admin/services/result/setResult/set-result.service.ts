import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SetResultService {
  private token: string;
  private headers: HttpHeaders;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = authService.getUserToken();
    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
  }

  getStudentInClass(classId: string) {
    return this.http.get(`${environment.apiUrl}/api/admin/result/${classId}`, {
      headers: this.headers,
    });
  }

  getStudentsAttendance(studentId: string, teacherId: string, classId: string) {
    return this.http.get(
      `${environment.apiUrl}/api/admin/result/get/attendance?studentId=${studentId}&teacherId=${teacherId}&classId=${classId}`,
      { headers: this.headers }
    );
  }

  setStudentResult(data: object) {
    return this.http
      .post(`${environment.apiUrl}/api/admin/result/set/degree`, data, {
        headers: this.headers,
      })
      .subscribe(
        (res: any) => {},
        (errors: any) => {
          sessionStorage.setItem('errorMessage', errors.error.message);
          window.location.reload();
        }
      );
  }

  showResult(classId: string) {
    return this.http
      .post(
        `${environment.apiUrl}/api/admin/result/show`,
        { classId: classId },
        { headers: this.headers }
      )
      .subscribe(
        (res: any) => {
          if (res.status != 200) return;
          sessionStorage.setItem('showResult', res.message);
          window.location.reload();
        },
        (errors: any) => {
          sessionStorage.setItem('errorMessage', errors.error.message);
          window.location.reload();
        }
      );
  }

  hideResult(classId: string) {
    return this.http
      .post(
        `${environment.apiUrl}/api/admin/result/hide`,
        { classId: classId },
        { headers: this.headers }
      )
      .subscribe(
        (res: any) => {
          if (res.status != 200) return;
          sessionStorage.setItem('hideResult', res.message);
          window.location.reload();
        },
        (errors: any) => {
          sessionStorage.setItem('errorMessage', errors.error.message);
          window.location.reload();
        }
      );
  }
}
