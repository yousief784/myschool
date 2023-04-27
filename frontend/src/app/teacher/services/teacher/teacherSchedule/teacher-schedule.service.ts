import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeacherScheduleService {
  private token: string;
  private headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.token = this.authService.getUserToken();
    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
  }

  getTeacherSchedule(teacherId: string) {
    return this.http.get(
      `${environment.apiUrl}/api/teacher/schedule/${teacherId}`,
      { headers: this.headers }
    );
  }
}
