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
  selectedFile: File | null = null;
  formData = new FormData();

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
    studentImage: ['', [Validators.required]],
  });
  classId: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private adminStudentService: AdminStudentService,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRouter!.params.subscribe((params: any) => {
      this.classId = params['classId'];
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addNewStudent() {
    if (this.addStudentValidation.invalid) return;
    this.formData = new FormData();

    const formValidationValue = { ...this.addStudentValidation.value };

    this.formData.append('fullname', formValidationValue.fullname);
    this.formData.append(
      'studentNationalID',
      formValidationValue.studentNationalID
    );
    this.formData.append(
      'parentNationalID',
      formValidationValue.parentNationalID
    );
    this.formData.append('parentPhone', formValidationValue.parentPhone);
    this.formData.append('classId', this.classId as unknown as string);
    this.formData.append(
      'studentImage',
      this.selectedFile as unknown as string
    );

    console.log('from component: ', this.formData);

    this.adminStudentService.addNewStudent(this.formData);
  }
}
