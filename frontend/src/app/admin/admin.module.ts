import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminStudentComponent } from './components/admin-student/admin-student.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AddCourseComponent } from './components/course/add-course/add-course.component';
import { AdminCourseComponent } from './components/course/admin-course/admin-course.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminStudentComponent,
    AddStudentComponent,
    AddCourseComponent,
    AdminCourseComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AdminModule {}
