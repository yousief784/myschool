import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css'],
})
export class TeacherDashboardComponent implements OnInit {
  user: any = {};

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      (response: any) => {
        if (response.status == 200) this.user = response.data;
        localStorage.setItem('userId', response.data._id);
      },
      (error: any) => {}
    );
  }

  navigateToSchedule() {
    console.log('hell');

    this.router.navigate(['/teacher/schedule']);
  }

  logout() {
    this.authService.logout();
  }
}
