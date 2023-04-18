import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private token: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = authService.getUserToken();
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
  }

  getAllClasses() {
    return this.http.get(`${environment.apiUrl}/api/admin/class`, {
      headers: this.headers,
    });
  }

  addNewClass(classData: object) {
    return this.http
      .post(`${environment.apiUrl}/api/admin/class/create`, classData, {
        headers: this.headers,
      })
      .subscribe(
        (response: any) => {
          console.log(response);

          if (response.status == 200) {
            sessionStorage.setItem(
              'classCreatedSuccessFully',
              response.message
            );
            window.location.reload();
          }
        },
        (errors: any) => {
          console.log(errors);
          sessionStorage.setItem('classError', errors.error.message);
          window.location.reload();
        }
      );
  }
}
