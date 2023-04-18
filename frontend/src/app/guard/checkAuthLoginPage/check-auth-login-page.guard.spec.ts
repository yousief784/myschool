import { TestBed } from '@angular/core/testing';

import { CheckAuthLoginPageGuard } from './check-auth-login-page.guard';

describe('CheckAuthLoginPageGuard', () => {
  let guard: CheckAuthLoginPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckAuthLoginPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
