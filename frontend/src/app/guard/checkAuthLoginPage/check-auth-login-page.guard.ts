import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CheckAuthLoginPageGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate() {
    // if the user is authenticated don't return to login page again go to his role dashboard
    if (this.authService.isLoggedIn()) {
      this.router.navigate([`${this.authService.userRole()}`]);
      return false;
    } else {
      return true;
    }
  }
}
