import { TestBed } from '@angular/core/testing';

import { TermDateService } from './term-date.service';

describe('TermDateService', () => {
  let service: TermDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
