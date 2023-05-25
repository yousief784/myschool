import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';

import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { StudentResultComponent } from './components/student-result/student-result.component';

@NgModule({
  declarations: [StudentDashboardComponent, ScheduleComponent, StudentResultComponent],
  imports: [CommonModule, StudentRoutingModule, FullCalendarModule],
})
export class StudentModule {}
