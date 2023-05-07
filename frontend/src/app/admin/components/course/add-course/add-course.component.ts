import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/admin/services/adminStudent/class/class.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/admin/services/course/course.service';
import { TeacherService } from 'src/app/admin/services/teacher/teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  addCourseValidation: FormGroup = this.formBuilder.group({
    courseName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]+$'),
      ],
    ],
    classId: ['', [Validators.required]],
    teacherId: ['', [Validators.required]],
    numberOfTimesPerWeek: [
      '',
      [Validators.required, Validators.pattern(/[0-9]+$/)],
    ],
  });

  classes: any = [];
  teachers: any = [];
  constructor(
    private classService: ClassService,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private teacherService: TeacherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.classService.getAllClasses().subscribe(
      (response: any) => {
        if (response.status !== 200) return;
        this.classes = response.data;
      },
      (errors) => {
        if (errors.error.status == 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }
      }
    );

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

  addNewCourse() {
    if (this.addCourseValidation.invalid) return;

    this.courseService.addNewCourse(this.addCourseValidation.value);
  }
}
