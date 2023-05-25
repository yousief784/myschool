import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentRoutingModule } from './parent-routing.module';
import { ParentDashboardComponent } from './components/parent-dashboard/parent-dashboard.component';
import { ParentShowResultComponent } from './components/parent-show-result/parent-show-result.component';


@NgModule({
  declarations: [
    ParentDashboardComponent,
    ParentShowResultComponent
  ],
  imports: [
    CommonModule,
    ParentRoutingModule
  ]
})
export class ParentModule { }
