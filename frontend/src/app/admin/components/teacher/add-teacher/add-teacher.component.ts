import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/admin/services/teacher/teacher.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css'],
})
export class AddTeacherComponent implements OnInit {
  addTeacherValidation: FormGroup = this.formBuilder.group({
    fullname: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+\s+[A-Za-z]+\s+[A-Za-z]+\s+[A-Za-z]+$/),
        Validators.minLength(2),
        Validators.maxLength(50),
      ],
    ],
    nationalID: [
      '',
      [
        Validators.required,
        Validators.pattern(/[0-9]+$/),
        Validators.minLength(14),
        Validators.maxLength(14),
      ],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {}

  addTeacher() {
    if (this.addTeacherValidation.invalid) return;

    this.teacherService.addTeacher(this.addTeacherValidation.value);
  }
}
