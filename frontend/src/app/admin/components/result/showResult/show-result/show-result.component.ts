import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SetResultService } from 'src/app/admin/services/result/setResult/set-result.service';
import { ShowResultService } from 'src/app/admin/services/result/showResult/show-result.service';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.css'],
})
export class ShowResultComponent implements OnInit {
  @ViewChild('showResult') showResult: any; // Reference to the student modal

  @Input() studentId: string = '';
  @Input() classId: string = '';
  @Input() teacherId: string = '';

  courseWorkDegree: number = 0;
  showResultData: any = {};

  constructor(
    private setResultService: SetResultService,
    private showResultService: ShowResultService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  openSetResultModal() {
    this.getAttendanceData();
    this.getStudentResult();
    this.showResult.nativeElement.style.display = 'block'; // Show result modal
  }

  closeSetResultModal() {
    this.showResult.nativeElement.style.display = 'none'; // Hide result modal
  }

  getAttendanceData() {
    this.setResultService
      .getStudentsAttendance(this.studentId, this.teacherId, this.classId)
      .subscribe(
        (res: any) => {
          if (res.status != 200) return;
          this.courseWorkDegree = res.courseWorkDegree || 1;
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

          this.showResultData = res.data;
        },
        (errors: any) => {
          if (errors.error.status == 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/']);
          } else if (errors.error.status == 404) this.showResultData = {};
        }
      );
  }
}
