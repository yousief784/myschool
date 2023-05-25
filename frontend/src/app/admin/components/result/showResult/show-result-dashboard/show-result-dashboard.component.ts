import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SetResultService } from 'src/app/admin/services/result/setResult/set-result.service';

@Component({
  selector: 'app-show-result-dashboard',
  templateUrl: './show-result-dashboard.component.html',
  styleUrls: ['./show-result-dashboard.component.css'],
})
export class ShowResultDashboardComponent implements OnInit {
  classId: string = '';
  notFoundStudentInThisClass: string = '';
  studentsInThisClass: any = {};
  constructor(
    private setResultService: SetResultService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activeRoute.params.subscribe((params) => {
      this.classId = params['classId'];
    });
  }

  ngOnInit(): void {
    this.setResultService.getStudentInClass(this.classId).subscribe(
      (res: any) => {
        if (res.status != 200) return;
        this.notFoundStudentInThisClass = '';
        this.studentsInThisClass = res.data;
      },
      (errors: any) => {
        console.log(errors);
        if (errors.error.status == 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        } else if (errors.error.status == 404) {
          this.notFoundStudentInThisClass = errors.error.message;
        }
      }
    );
  }
}
