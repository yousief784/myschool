import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  isLoggedIn = false;
  constructor(public authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
