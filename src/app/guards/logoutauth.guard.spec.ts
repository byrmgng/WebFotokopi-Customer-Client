import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logoutauthGuard } from './logoutauth.guard';

describe('logoutauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logoutauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
