import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAttendance } from 'src/app/teacher/models/attendance';
import { AttendanceService } from 'src/app/teacher/services/attendance/attendance.service';

@Component({
  selector: 'app-teacher-attendance-dashboard',
  templateUrl: './teacher-attendance-dashboard.component.html',
  styleUrls: ['./teacher-attendance-dashboard.component.css'],
})
export class TeacherAttendanceDashboardComponent implements OnInit {
  noClassNow: boolean = true;
  students: IAttendance[] = [];
  constructor(
    private attendanceService: AttendanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.attendanceService.getStudentsClassNow().subscribe(
      (res: any) => {
        console.log(res);
        if (res.status != 200) return;
        this.students = res.data;
      },
      (errors: any) => {
        if (errors.error.status == 404) this.noClassNow = false;
        if (errors.error.status == 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }
      }
    );

    setTimeout(() => {
      this.attendanceService
        .createAttendance(this.students[0].class || '')
        .subscribe(
          (res: any) => {          
            if (res.status == 200) return;
          },
          (errors) => {
            if (errors.error.status == 401) {
              localStorage.removeItem('token');
              this.router.navigate(['/']);
            }
          }
        );
    }, 400);
  }
}
