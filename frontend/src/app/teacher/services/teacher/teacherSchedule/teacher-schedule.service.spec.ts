import { TestBed } from '@angular/core/testing';

import { TeacherScheduleService } from './teacher-schedule.service';

describe('TeacherScheduleService', () => {
  let service: TeacherScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
