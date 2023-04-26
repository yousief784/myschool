import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';

import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

@NgModule({
  declarations: [StudentDashboardComponent, ScheduleComponent],
  imports: [CommonModule, StudentRoutingModule, FullCalendarModule],
})
export class StudentModule {}
