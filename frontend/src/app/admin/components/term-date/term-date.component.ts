import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassService } from '../../services/adminStudent/class/class.service';
import { TermDateService } from '../../services/termDate/term-date.service';

@Component({
  selector: 'app-term-date',
  templateUrl: './term-date.component.html',
  styleUrls: ['./term-date.component.css'],
})
export class TermDateComponent implements OnInit {
  setTermScheduleValidation: FormGroup = this.formBuilder.group({
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
  });

  classes: any = [];
  successMessage: string;
  errorMessage: string;
  termDateSetSuccessfully: string;

  constructor(
    private formBuilder: FormBuilder,
    private classService: ClassService,
    private termDateService: TermDateService
  ) {
    this.successMessage = sessionStorage.getItem('successMessage') || '';

    sessionStorage.removeItem('successMessage');

    this.termDateSetSuccessfully =
      sessionStorage.getItem('termDateSetSuccessfully') || '';

    sessionStorage.removeItem('termDateSetSuccessfully');

    this.errorMessage = sessionStorage.getItem('errorMessage') || '';

    sessionStorage.removeItem('errorMessage');
  }

  ngOnInit(): void {
    this.classService.getAllClasses().subscribe((res: any) => {
      this.classes = res.data;
    });
  }

  setTermSchedule() {
    if (this.setTermScheduleValidation.invalid) return;

    this.termDateService.setTermDate(this.setTermScheduleValidation.value);
  }

  setClassSchedule(classId: string) {
    this.termDateService.setClassSchedule(classId);
  }
}
