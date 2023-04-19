import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/admin/models/course.interface';
import { CourseService } from 'src/app/admin/services/course/course.service';

@Component({
  selector: 'app-admin-course',
  templateUrl: './admin-course.component.html',
  styleUrls: ['./admin-course.component.css'],
})
export class AdminCourseComponent implements OnInit {
  successMessage: string;
  errorMessage: string;
  courses: ICourse[] = [];

  constructor(private courseService: CourseService) {
    this.successMessage =
      sessionStorage.getItem('courseCreatedSuccessFully') || '';

    sessionStorage.removeItem('courseCreatedSuccessFully');

    this.errorMessage = sessionStorage.getItem('errorMessage') || '';

    sessionStorage.removeItem('errorMessage');
  }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((response: any) => {
      if (response.status == 200) {
        console.log(response.data);
        
        this.courses = response.data;
      }
    });
  }
}
