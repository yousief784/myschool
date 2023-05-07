import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAttendanceDashboardComponent } from './teacher-attendance-dashboard.component';

describe('TeacherAttendanceDashboardComponent', () => {
  let component: TeacherAttendanceDashboardComponent;
  let fixture: ComponentFixture<TeacherAttendanceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAttendanceDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherAttendanceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
