import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassService } from '../../services/adminStudent/class/class.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('studentModal') studentModal: any; // Reference to the student modal
  @ViewChild('classModal') classModal: any; // Reference to the class modal
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
    private userService: UserService
  ) {
    this.classCreatedSuccessFully =
      sessionStorage.getItem('classCreatedSuccessFully') || '';

    sessionStorage.removeItem('classCreatedSuccessFully');

    this.classError = sessionStorage.getItem('classError') || '';

    sessionStorage.removeItem('classError');
  }

  ngOnInit(): void {
    this.classService.getAllClasses().subscribe((response: any) => {
      if (response.status == 200) {
        this.classes = response.data;
      }
    });

    this.userService.getUserData().subscribe(
      (response: any) => {
        if (response.status == 200) this.user = response.data;
      },
      (error: any) => {}
    );
  }

  openStudentModal() {
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

  addNewClass() {
    if (this.addClassValidation.invalid) {
      return;
    }

    this.classService.addNewClass(this.addClassValidation.value);
  }

  logout() {
    this.authService.logout();
  }
}
