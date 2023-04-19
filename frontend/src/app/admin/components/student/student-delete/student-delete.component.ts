import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AdminStudentService } from 'src/app/admin/services/adminStudent/admin-student.service';

@Component({
  selector: 'app-student-delete',
  templateUrl: './student-delete.component.html',
  styleUrls: ['./student-delete.component.css'],
})
export class StudentDeleteComponent implements OnInit {
  @ViewChild('deleteStudentModal') deleteStudentModal: any; // Reference to the student modal
  @Input() userId: string = '';

  constructor(private adminStudentService: AdminStudentService) {}

  ngOnInit(): void {}

  openDeleteStudentModal() {
    console.log(this.userId);
    this.deleteStudentModal.nativeElement.style.display = 'block'; // Show student modal
  }

  closeDeleteStudentModal() {
    this.deleteStudentModal.nativeElement.style.display = 'none'; // Hide student modal
  }

  deleteStudent() {
    this.adminStudentService.deleteStudent(this.userId);
  }
}
