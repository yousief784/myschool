import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmniTeacherComponent } from './admni-teacher.component';

describe('AdmniTeacherComponent', () => {
  let component: AdmniTeacherComponent;
  let fixture: ComponentFixture<AdmniTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmniTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmniTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
