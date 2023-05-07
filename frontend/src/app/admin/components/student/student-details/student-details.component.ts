import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IStudent } from 'src/app/admin/models/student.interface';
import { AdminStudentService } from 'src/app/admin/services/adminStudent/admin-student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  @ViewChild('detailsStudentModal') detailsStudentModal: any; // Reference to the student modal
  @Input() studentId: string = '';
  studentDetails: IStudent = {
    _id: '',
    studentId: 0,
    user: {
      _id: '',
      fullname: '',
      nationalID: '',
    },
    parent: {
      _id: '',
      parentPhone: '',
      user: {
        _id: '',
        parentName: '',
        nationalID: '',
      },
    },
    class: {
      _id: '',
      className: '',
      classId: 0,
    },
  };

  constructor(private adminStudentService: AdminStudentService, private router: Router) {}

  ngOnInit(): void {
    this.adminStudentService.showStudentDetails(this.studentId).subscribe(
      (response: any) => {
        if (response.status !== 200) return;
        this.studentDetails = response.data;
      },
      (errors) => {
        if (errors.error.status == 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }
      }
    );
  }

  openDetailsStudentModal() {
    this.detailsStudentModal.nativeElement.style.display = 'block'; // Show student modal
  }

  closeDetailsStudentModal() {
    this.detailsStudentModal.nativeElement.style.display = 'none'; // Hide student modal
  }
}
