import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassService } from '../../services/adminStudent/class/class.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('studentModal') studentModal: any; // Reference to the student modal
  @ViewChild('classModal') classModal: any; // Reference to the class modal
  @ViewChild('showResultModal') showResultModal: any; // Reference to the class modal
  @ViewChild('setResultModal') setResultModal: any; // Reference to the class modal

  classCreatedSuccessFully: string = '';
  classError: string = '';
  classes: any = [];
  user: any = {};

  addClassValidation: FormGroup = this.formBuilder.group({
    className: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]+$'),
      ],
    ],
  });
  constructor(
    private formBuilder: FormBuilder,
    private classService: ClassService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.classCreatedSuccessFully =
      sessionStorage.getItem('classCreatedSuccessFully') || '';

    sessionStorage.removeItem('classCreatedSuccessFully');

    this.classError = sessionStorage.getItem('classError') || '';

    sessionStorage.removeItem('classError');
  }

  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      (response: any) => {
        console.log("userData", response)
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

  openStudentModal() {
    this.getClasses();
    this.studentModal.nativeElement.style.display = 'block'; // Show student modal
  }

  openClassModal() {
    this.classModal.nativeElement.style.display = 'block'; // Show class modal
  }

  closeStudentModal() {
    this.studentModal.nativeElement.style.display = 'none'; // Hide student modal
  }

  closeClassModal() {
    this.classModal.nativeElement.style.display = 'none'; // Hide class modal
  }

  openShowResultModal() {
    this.getClasses();
    this.showResultModal.nativeElement.style.display = 'block'; // Show result modal
  }

  closeShowResultModal() {
    this.showResultModal.nativeElement.style.display = 'none'; // Hide result modal
  }

  openSetResultModal() {
    this.getClasses();
    this.setResultModal.nativeElement.style.display = 'block'; // Show result modal
  }

  closeSetResultModal() {
    this.setResultModal.nativeElement.style.display = 'none'; // Hide result modal
  }

  addNewClass() {
    if (this.addClassValidation.invalid) {
      return;
    }

    this.classService.addNewClass(this.addClassValidation.value);
  }

  getClasses() {
    this.classService.getAllClasses().subscribe(
      (response: any) => {
        if (response.status == 200) {
          this.classes = response.data;
        }
      },
      (errors) => {
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
