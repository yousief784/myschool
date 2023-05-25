import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SetResultService } from 'src/app/admin/services/result/setResult/set-result.service';
import { ShowResultService } from 'src/app/admin/services/result/showResult/show-result.service';

@Component({
  selector: 'app-set-result',
  templateUrl: './set-result.component.html',
  styleUrls: ['./set-result.component.css'],
})
export class SetResultComponent implements OnInit {
  @ViewChild('setResult') setResult: any; // Reference to the student modal

  @Input() studentId: string = '';
  @Input() classId: string = '';
  @Input() teacherId: string = '';

  courseWorkDegree: number = 1;

  setResultValidation: FormGroup = this.formBuilder.group({
    midTermDegree: [
      '',
      [
        Validators.required,
        Validators.min(0),
        Validators.max(20),
        Validators.pattern(/[0-9]+$/),
      ],
    ],
    finalDegree: [
      '',
      [
        Validators.required,
        Validators.min(60),
        Validators.max(80),
        Validators.pattern(/[0-9]+$/),
      ],
    ],
  });

  showResult: any = {};

  constructor(
    private setResultService: SetResultService,
    private showResultService: ShowResultService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  openSetResultModal() {
    this.getAttendanceData();
    this.getStudentResult();
    this.setResult.nativeElement.style.display = 'block'; // Show result modal
  }

  closeSetResultModal() {
    this.setResult.nativeElement.style.display = 'none'; // Hide result modal
  }

  getAttendanceData() {
    this.setResultService
      .getStudentsAttendance(this.studentId, this.teacherId, this.classId)
      .subscribe(
        (res: any) => {
          if (res.status != 200) return;
          this.courseWorkDegree = !res.courseWorkDegree
            ? 1
            : res.courseWorkDegree;
        },
        (errors: any) => {
          if (errors.error.status == 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/']);
          }
        }
      );
  }

  getStudentResult() {
    this.showResultService
      .getStudentResult(this.studentId, this.teacherId, this.classId)
      .subscribe(
        (res: any) => {
          if (res.status !== 200) return;

          this.showResult = res.data;
        },
        (errors: any) => {
          if (errors.error.status == 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/']);
          } else if (errors.error.status == 404) this.showResult = {};
        }
      );
  }

  setResultSubmit() {
    if (this.setResultValidation.invalid) return;

    this.setResultService.setStudentResult({
      ...this.setResultValidation.value,
      courseWorkDegree: this.courseWorkDegree,
      studentId: this.studentId,
      teacherId: this.teacherId,
      classId: this.classId,
    });

    this.closeSetResultModal();
  }
}
