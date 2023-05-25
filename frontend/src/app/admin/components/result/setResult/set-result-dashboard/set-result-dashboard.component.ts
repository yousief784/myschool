import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SetResultService } from 'src/app/admin/services/result/setResult/set-result.service';

@Component({
  selector: 'app-set-result-dashboard',
  templateUrl: './set-result-dashboard.component.html',
  styleUrls: ['./set-result-dashboard.component.css'],
})
export class SetResultDashboardComponent implements OnInit {
  classId: string = '';
  studentsInThisClass: any = {};
  showResultAlert: string = '';
  hideResultAlert: string = '';
  errorMessage: string = '';
  constructor(
    private setResultService: SetResultService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activeRoute.params.subscribe((params) => {
      this.classId = params['classId'];
    });

    this.showResultAlert = sessionStorage.getItem('showResult') || '';

    sessionStorage.removeItem('showResult');

    this.hideResultAlert = sessionStorage.getItem('hideResult') || '';

    sessionStorage.removeItem('hideResult');

    this.errorMessage = sessionStorage.getItem('errorMessage') || '';

    sessionStorage.removeItem('errorMessage');
  }

  ngOnInit(): void {
    this.setResultService.getStudentInClass(this.classId).subscribe(
      (res: any) => {
        if (res.status != 200) return;
        this.studentsInThisClass = res.data;
      },
      (errors: any) => {
        console.log(errors);
        if (errors.error.status == 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        } else if (errors.error.status == 404) {
          console.log('not found');
        }
      }
    );
  }

  showResult() {
    this.setResultService.showResult(this.classId);
  }

  hideResult() {
    this.setResultService.hideResult(this.classId);
  }
}
