import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermDateComponent } from './term-date.component';

describe('TermDateComponent', () => {
  let component: TermDateComponent;
  let fixture: ComponentFixture<TermDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
