import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IUserShow } from 'src/app/models/showUser.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { parentChildrenService } from '../../services/parent/students/parentChildren.service';

@Component({
  selector: 'app-parent-dashboard',
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.css'],
})
export class ParentDashboardComponent implements OnInit {
  user: IUserShow = { _id: '', nationalID: '' };
  @ViewChild('showChildren') showChildren: any; // Reference to the student modal
  childrens: any = {};
  
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private parentChildrenService: parentChildrenService
  ) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      (response: any) => {
        if (response.status == 200) this.user = response.data;
      },
      (errors) => {
        if (errors.error.status == 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }
      }
    );
  }

  openShowChildrenModal() {
    this.getChildrens();
    this.showChildren.nativeElement.style.display = 'block'; // Show result modal
  }

  closeShowChildrenModal() {
    this.showChildren.nativeElement.style.display = 'none'; // Hide result modal
  }

  getChildrens() {
    this.parentChildrenService.getChildren().subscribe(
      (res: any) => {
        if (res.status !== 200) return;

        this.childrens = res.data.students;
      },
      (errors: any) => {
        if (errors.error.status == 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
