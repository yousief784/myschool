import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetResultDashboardComponent } from './set-result-dashboard.component';

describe('SetResultDashboardComponent', () => {
  let component: SetResultDashboardComponent;
  let fixture: ComponentFixture<SetResultDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetResultDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetResultDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
