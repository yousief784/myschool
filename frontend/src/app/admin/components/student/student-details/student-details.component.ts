import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  constructor(private adminStudentService: AdminStudentService) {}

  ngOnInit(): void {
    this.adminStudentService
      .showStudentDetails(this.studentId)
      .subscribe((response: any) => {
        if (response.status !== 200) return;
        this.studentDetails = response.data;
      });
  }

  openDetailsStudentModal() {
    console.log(this.studentDetails);

    this.detailsStudentModal.nativeElement.style.display = 'block'; // Show student modal
  }

  closeDetailsStudentModal() {
    this.detailsStudentModal.nativeElement.style.display = 'none'; // Hide student modal
  }
}
