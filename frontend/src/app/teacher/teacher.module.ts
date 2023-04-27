import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { TeacherScheduleComponent } from './components/teacher-schedule/teacher-schedule.component';

@NgModule({
  declarations: [TeacherDashboardComponent, TeacherScheduleComponent],
  imports: [CommonModule, TeacherRoutingModule, FullCalendarModule],
})
export class TeacherModule {}
