import { Component, OnInit } from '@angular/core';
import { parentChildrenService } from '../../services/parent/students/parentChildren.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-parent-show-result',
  templateUrl: './parent-show-result.component.html',
  styleUrls: ['./parent-show-result.component.css'],
})
export class ParentShowResultComponent implements OnInit {
  studentId: string = '';
  courses: any = [];
  result: any = [];
  notFound: string = '';
  notAllCourses: boolean = false;

  constructor(
    private parentChidrenService: parentChildrenService,
    private router: Router,
    private activedRouter: ActivatedRoute
  ) {
    this.activedRouter.params.subscribe((params) => {
      this.studentId = params['studentId'];
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.parentChidrenService.getResult(this.studentId).subscribe(
        (res: any) => {
          if (res.status != 200) return;
          console.log(res);

          this.courses = res.data[0].class.courses;
          this.result = res.data;
          this.notAllCourses = this.courses.length != res.data.length && true;
        },
        (errors: any) => {
          if (errors.error.status == 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/']);
          } else if (errors.error.status == 404) {
            this.notFound = errors.error.message;
          }
        }
      );
    }, 200);
  }
}
