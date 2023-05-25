import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student/student.service';
import { Router } from '@angular/router';
import { StudentResultService } from '../../services/student/result/student-result.service';

@Component({
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
  styleUrls: ['./student-result.component.css'],
})
export class StudentResultComponent implements OnInit {
  studentId: string = '';
  noResult: string = '';
  courses: any = [];
  result: any = [];
  notAllCourses: boolean = false;

  constructor(
    private studentService: StudentService,
    private studentResultService: StudentResultService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentService.getStudentData().subscribe(
      (res: any) => {
        this.studentId = res.data._id;
      },
      (errors) => {
        if (errors.error.status == 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }
      }
    );

    setTimeout(() => {
      this.studentResultService.getResult(this.studentId).subscribe(
        (res: any) => {
          if (res.status != 200) return;
          console.log(res);

          this.courses = res.data[0].class.courses;
          this.result = res.data;
          this.notAllCourses = this.courses.length != res.data.length && true;
        },
        (errors: any) => {
          if (errors.error.status == 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/']);
          } else if (errors.error.status == 404) {
            this.noResult = errors.error.message;
          }
        }
      );
    }, 200);
  }
}
