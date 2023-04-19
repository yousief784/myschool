import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminStudentService } from '../../../services/adminStudent/admin-student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  addStudentValidation: FormGroup = this.formBuilder.group({
    fullname: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+\s+[A-Za-z]+\s+[A-Za-z]+\s+[A-Za-z]+$/),
        Validators.minLength(2),
        Validators.maxLength(50),
      ],
    ],
    studentNationalID: [
      '',
      [
        Validators.required,
        Validators.pattern(/[0-9]+$/),
        Validators.minLength(14),
        Validators.maxLength(14),
      ],
    ],
    parentNationalID: [
      '',
      [
        Validators.required,
        Validators.pattern(/[0-9]+$/),
        Validators.minLength(14),
        Validators.maxLength(14),
      ],
    ],
    parentPhone: [
      '',
      [
        Validators.required,
        Validators.pattern(/[0-9]+$/),
        Validators.minLength(11),
        Validators.maxLength(11),
      ],
    ],
  });
  classId: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private adminStudentService: AdminStudentService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router!.params.subscribe((params: any) => {
      this.classId = params['classId'];
    });
  }

  addNewStudent() {
    if (this.addStudentValidation.invalid) {
      return;
    }
    this.adminStudentService.addNewStudent({
      ...this.addStudentValidation.value,
      classId: this.classId,
    });
  }
}
