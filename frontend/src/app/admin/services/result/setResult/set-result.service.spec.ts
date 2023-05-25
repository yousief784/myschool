import { TestBed } from '@angular/core/testing';

import { SetResultService } from './set-result.service';

describe('SetResultService', () => {
  let service: SetResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
