import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private token: string;
  private headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.token = this.authService.getUserToken();
    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
  }

  getStudentsClassNow() {
    return this.http.get(`${environment.apiUrl}/api/teacher/attendance/get`, {
      headers: this.headers,
    });
  }

  getStudentAttendance(studentId: string) {
    return this.http.get(
      `${environment.apiUrl}/api/teacher/attendance/student/${studentId}`,
      {
        headers: this.headers,
      }
    );
  }

  createAttendance(classId: string) {
    return this.http.post(
      `${environment.apiUrl}/api/teacher/attendance/class/${classId}`,
      {},
      { headers: this.headers }
    );
  }

  setStudentAttendance(attendId: string, attendStatus: string) {
    return this.http.post(
      `${environment.apiUrl}/api/teacher/attendance/student/set-attendance`,
      { attendId: attendId, attendStatus: attendStatus },
      {
        headers: this.headers,
      }
    );
  }
}
