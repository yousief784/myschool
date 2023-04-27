import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TermDateService {
  private token: string;
  private headers: HttpHeaders;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = authService.getUserToken();
    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
  }

  setTermDate(body: any) {
    return this.http
      .post(`${environment.apiUrl}/api/admin/term-date`, body, {
        headers: this.headers,
      })
      .subscribe(
        (response: any) => {
          if (response.status == 200) {
            sessionStorage.setItem('termDateSetSuccessfully', response.message);
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

  setClassSchedule(classId: any) {
    return this.http
      .post(
        `${environment.apiUrl}/api/admin/classSchedule/${classId}`,
        {},
        { headers: this.headers }
      )
      .subscribe(
        (response: any) => {
          if (response.status == 200) {
            sessionStorage.setItem('successMessage', response.message);
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
