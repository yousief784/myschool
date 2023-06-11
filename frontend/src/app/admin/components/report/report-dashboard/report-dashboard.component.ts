import {Component, OnInit} from '@angular/core';
import {ClassService} from "../../../services/adminStudent/class/class.service";
import {TeacherReportService} from "../../../services/report/teacherReport/teacher-report.service";
import {Router} from "@angular/router";
import {ClassReportService} from "../../../services/report/classReport/class-report.service";

@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.css']
})
export class ReportDashboardComponent implements OnInit {
  classes: any = []
  notFoundStudentInThisClass: string = ''

  constructor(private router: Router, private classService: ClassService, private teacherReportService: TeacherReportService, private classReportService: ClassReportService) {
  }

  ngOnInit(): void {
    this.classService.getAllClasses().subscribe((res: any) => {
      if (res.status != 200) return;
      this.classes = res.data
      console.log(this.classes)
    }, (errors: any) => {
      if (errors.error.status == 401) {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }
    })
  }

  teacherReport() {
    this.teacherReportService.generateReport().subscribe((res: any) => {
      if (res.status != 200) return;
      window.open(res.data.pdfName, '_blank');
    }, (errors: any) => {
      if (errors.error.status == 401) {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }
    })
  }

  classReport(classId: string) {
    this.classReportService.generateReport(classId).subscribe((res: any) => {
      if (res.status != 200) return;
      window.open(res.data.pdfName, '_blank');
    }, (errors: any) => {
      if (errors.error.status == 401) {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }
    })

  }
}
