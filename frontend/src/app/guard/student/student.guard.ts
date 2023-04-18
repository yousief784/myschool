import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class StudentGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (
      this.authService.isLoggedIn() &&
      this.authService.userRole() == 'student'
    ) {
      return true;
    } else {
      this.router.navigate(['/no-permission']); // If user is not logged in, redirect to login page
      return false;
    }

    // if (this.authService.isLoggedIn()) {
    //   if (this.authService.userRole() == 'student') {
    //     return true;
    //   } else {
    //     this.router.navigate(['/no-permission']);
    //     return false;
    //   }
    // } else {
    //   this.router.navigate(['/']);
    //   return false;
    // }
  }
}
