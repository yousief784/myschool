import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginValidation: FormGroup = this.formBuilder.group({
    nationalID: [
      '',
      [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.pattern(/[0-9]+$/),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.pattern(/[0-9]+$/),
      ],
    ],
  });

  loginError: string;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginError = sessionStorage.getItem('loginError') || '';

    sessionStorage.removeItem('loginError');
  }

  ngOnInit(): void {}

  onSubmit() {
    this.authService.login(this.loginValidation.value);
  }
}
