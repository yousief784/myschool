import { TestBed } from '@angular/core/testing';

import { parentChildrenService } from './parentChildren.service';

describe('parentChildrenService', () => {
  let service: parentChildrenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(parentChildrenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
