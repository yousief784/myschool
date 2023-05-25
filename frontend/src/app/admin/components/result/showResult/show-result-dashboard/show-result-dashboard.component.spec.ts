import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResultDashboardComponent } from './show-result-dashboard.component';

describe('ShowResultDashboardComponent', () => {
  let component: ShowResultDashboardComponent;
  let fixture: ComponentFixture<ShowResultDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowResultDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowResultDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
