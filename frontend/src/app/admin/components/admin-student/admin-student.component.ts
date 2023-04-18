import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminStudentService } from '../../services/adminStudent/admin-student.service';
import { StudentInterface } from '../../models/student.interface';

@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.css'],
})
export class AdminStudentComponent implements OnInit {
  @ViewChild('deleteStudentModal') deleteStudentModal: any; // Reference to the student modal
  successMessage: string;
  studentAlreadyExist: string;
  studentRemovedSuccessfully: string;
  studentRemovedError: string;
  classId: number = 0;
  userId: string = '';
  students: StudentInterface[] = [];

  constructor(
    private router: ActivatedRoute,
    private adminStudentService: AdminStudentService
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
    this.router!.params.subscribe((params: any) => {
      this.classId = params['classId'];
    });

    this.adminStudentService.getAllStudentsInThisClass(this.classId).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status == 200) {
          this.students = response.data;
        }
      },
      (errors: any) => {}
    );
  }

  openDeleteStudentModal(studentId: string) {
    this.userId = studentId;

    this.deleteStudentModal.nativeElement.style.display = 'block'; // Show student modal
  }

  closeDeleteStudentModal() {
    this.deleteStudentModal.nativeElement.style.display = 'none'; // Hide student modal
  }

  deleteStudent() {
    this.adminStudentService.deleteStudent(this.userId);
  }
}
