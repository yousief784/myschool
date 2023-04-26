import { Component, OnInit } from '@angular/core';
import { IUserShow } from 'src/app/models/showUser.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-parent-dashboard',
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.css'],
})
export class ParentDashboardComponent implements OnInit {
  user: IUserShow = { _id: '', nationalID: '' };
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      (response: any) => {
        if (response.status == 200) this.user = response.data;
      },
      (error: any) => {}
    );
  }

  logout() {
    this.authService.logout();
  }
}
