import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/admin/services/teacher/teacher.service';

@Component({
  selector: 'app-admni-teacher',
  templateUrl: './admni-teacher.component.html',
  styleUrls: ['./admni-teacher.component.css'],
})
export class AdmniTeacherComponent implements OnInit {
  successMessage: string;
  errorMessage: string;
  teachers: any = [];

  constructor(private teacherService: TeacherService, private router: Router) {
    this.successMessage =
      sessionStorage.getItem('teacherCreatedSuccessFully') || '';

    sessionStorage.removeItem('teacherCreatedSuccessFully');

    this.errorMessage = sessionStorage.getItem('errorMessage') || '';

    sessionStorage.removeItem('errorMessage');
  }

  ngOnInit(): void {
    this.teacherService.getAllTeachers().subscribe(
      (response: any) => {
        if (response.status !== 200) return;
        this.teachers = response.data;
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
