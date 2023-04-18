import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (
      this.authService.isLoggedIn() &&
      this.authService.userRole() == 'admin'
    ) {
      // this.router.navigate([`${this.authService.userRole()}`]);

      return true;
    } else {
      this.router.navigate(['/no-permission']); // If user is not logged in, redirect to login page
      return false;
    }

    // if (this.authService.isLoggedIn()) {
    //   if (this.authService.userRole() == 'admin') {
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
