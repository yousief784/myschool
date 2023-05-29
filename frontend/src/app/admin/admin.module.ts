import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddStudentComponent } from './components/student/add-student/add-student.component';
import { AddCourseComponent } from './components/course/add-course/add-course.component';
import { AdminCourseComponent } from './components/course/admin-course/admin-course.component';
import { AdminStudentComponent } from './components/student/admin-student/admin-student.component';
import { StudentDetailsComponent } from './components/student/student-details/student-details.component';
import { StudentDeleteComponent } from './components/student/student-delete/student-delete.component';
import { AdmniTeacherComponent } from './components/teacher/admni-teacher/admni-teacher.component';
import { AddTeacherComponent } from './components/teacher/add-teacher/add-teacher.component';
import { TermDateComponent } from './components/term-date/term-date.component';
import { SetResultDashboardComponent } from './components/result/setResult/set-result-dashboard/set-result-dashboard.component';
import { ShowResultDashboardComponent } from './components/result/showResult/show-result-dashboard/show-result-dashboard.component';
import { SetResultComponent } from './components/result/setResult/set-result/set-result.component';
import { ShowResultComponent } from './components/result/showResult/show-result/show-result.component';
import {ReportDashboardComponent} from "./components/report/report-dashboard/report-dashboard.component";

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminStudentComponent,
    AddStudentComponent,
    AddCourseComponent,
    AdminCourseComponent,
    StudentDetailsComponent,
    StudentDeleteComponent,
    AdmniTeacherComponent,
    AddTeacherComponent,
    TermDateComponent,
    SetResultDashboardComponent,
    ShowResultDashboardComponent,
    SetResultComponent,
    ShowResultComponent,
    ReportDashboardComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AdminModule {}
