import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    console.log(this.authService.userRole());

    if (this.authService.userRole() == 'teacher') {
      return true;
    } else {
      this.router.navigate(['/no-permission']); // If user is not logged in, redirect to login page
      return false;
    }
  }
}
