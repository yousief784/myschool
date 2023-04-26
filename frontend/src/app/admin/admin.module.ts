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
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AdminModule {}
