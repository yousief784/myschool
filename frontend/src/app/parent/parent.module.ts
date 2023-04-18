import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentRoutingModule } from './parent-routing.module';
import { ParentDashboardComponent } from './components/parent-dashboard/parent-dashboard.component';


@NgModule({
  declarations: [
    ParentDashboardComponent
  ],
  imports: [
    CommonModule,
    ParentRoutingModule
  ]
})
export class ParentModule { }
