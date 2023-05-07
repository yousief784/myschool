import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from 'src/app/admin/models/student.interface';
import { AdminStudentService } from 'src/app/admin/services/adminStudent/admin-student.service';

@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.css'],
})
export class AdminStudentComponent implements OnInit {
  successMessage: string;
  studentAlreadyExist: string;
  studentRemovedSuccessfully: string;
  studentRemovedError: string;
  classId: number = 0;
  students: IStudent[] = [];

  constructor(
    private activeRouter: ActivatedRoute,
    private adminStudentService: AdminStudentService,
    private router: Router
  ) {
    this.successMessage =
      sessionStorage.getItem('studentAddedSuccessfully') || '';

    sessionStorage.removeItem('studentAddedSuccessfully');

    this.studentAlreadyExist =
      sessionStorage.getItem('studentAlreadyExist') || '';

    sessionStorage.removeItem('studentAlreadyExist');

    this.studentRemovedSuccessfully =
      sessionStorage.getItem('studentRemovedSuccessfully') || '';

    sessionStorage.removeItem('studentRemovedSuccessfully');

    this.studentRemovedError =
      sessionStorage.getItem('studentRemovedError') || '';

    sessionStorage.removeItem('studentRemovedError');
  }

  ngOnInit(): void {
    this.activeRouter!.params.subscribe((params: any) => {
      this.classId = params['classId'];
    });

    this.adminStudentService.getAllStudentsInThisClass(this.classId).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status == 200) {
          this.students = response.data;
        }
      },
      (errors) => {
        if (errors.error.status == 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }
      }
    );
  }
}
