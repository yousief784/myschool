import { TestBed } from '@angular/core/testing';

import { TeacherReportService } from './teacher-report.service';

describe('TeacherReportService', () => {
  let service: TeacherReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
