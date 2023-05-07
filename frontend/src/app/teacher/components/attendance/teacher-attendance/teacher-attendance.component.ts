import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IStudent } from 'src/app/teacher/models/studentDetails';
import { AttendanceService } from 'src/app/teacher/services/attendance/attendance.service';
import { TeacherStudentService } from 'src/app/teacher/services/teacherStudent/teacher-student.service';

@Component({
  selector: 'app-teacher-attendance',
  templateUrl: './teacher-attendance.component.html',
  styleUrls: ['./teacher-attendance.component.css'],
})
export class TeacherAttendanceComponent implements OnInit {
  @ViewChild('attendanceDetails') attendanceDetails: any; // Reference to the student modal
  @Input() studentId: string = '';
  showButtons = false;
  today: Date = new Date();
  startTime = `${this.today.getHours()  < 10 ? '0' : ''}${
    this.today.getHours() 
  }:00:00`;
  todayIndex: number = -1;
  studentDetails: IStudent = {
    _id: '',
    studentId: 0,
    class: {
      _id: '',
      className: '',
    },
    user: {
      _id: '',
      fullname: '',
    },
  };
  studentAttendance: any = [];
  numberOfWeeks: number[] = [];

  constructor(
    private teacherStudentService: TeacherStudentService,
    private attendanceService: AttendanceService,
    private router: Router
  ) {
    // this.today.setHours(0, 0, 0, 0);
  }

  ngOnInit(): void {
    this.teacherStudentService.getStudentData(this.studentId).subscribe(
      (res: any) => {
        if (res.status !== 200) return;
        this.studentDetails = res.data;
      },
      (errors: any) => {
        if (errors.error.status == 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }
      }
    );
  }

  openDetailsStudentModal() {
    this.attendanceService.getStudentAttendance(this.studentId).subscribe(
      (res: any) => {
        if (res.status !== 200) return;
        res.data.map((item: any, index: number) => {
          const dateFromApi = new Date(item.date);
          this.today.setHours(0, 0, 0, 0);
          dateFromApi.setHours(0, 0, 0, 0);
          const todayUTC = new Date(
            Date.UTC(
              this.today.getFullYear(),
              this.today.getMonth(),
              this.today.getDate()
            )
          );
          const apiDateUTC = new Date(
            Date.UTC(
              dateFromApi.getFullYear(),
              dateFromApi.getMonth(),
              dateFromApi.getDate()
            )
          );

          if (
            Number(todayUTC) === Number(apiDateUTC) &&
            item.classSchedule.startTime == this.startTime &&
            item.attendance == null
          ) {
            this.todayIndex = index;
          }
        });

        this.studentAttendance = res.data;

        this.numberOfWeeks = Array.from(
          {
            length:
              res.data.length /
              res.data[0].classSchedule.course.numberOfTimesPerWeek,
          },
          (_, i) => i + 1
        );
        console.log('ss', res.data.length);
      },
      (errors: any) => {
        if (errors.error.status == 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }
      }
    );
    setTimeout(() => {
      this.attendanceDetails.nativeElement.style.display = 'block'; // Show student modal
    }, 500);
  }

  closeDetailsStudentModal() {
    this.attendanceDetails.nativeElement.style.display = 'none'; // Hide student modal
  }

  sendAttendance(attendId: string, attendStatus: string) {
    this.attendanceService
      .setStudentAttendance(attendId, attendStatus)
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res.status != 200) return;

          location.reload();
        },
        (errors) => {
          if (errors.error.status == 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/']);
          }
        }
      );
  }

  private getStudentAttendance() {}
}
