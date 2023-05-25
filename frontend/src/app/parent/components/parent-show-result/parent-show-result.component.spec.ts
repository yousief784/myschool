import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentShowResultComponent } from './parent-show-result.component';

describe('ParentShowResultComponent', () => {
  let component: ParentShowResultComponent;
  let fixture: ComponentFixture<ParentShowResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentShowResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentShowResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
