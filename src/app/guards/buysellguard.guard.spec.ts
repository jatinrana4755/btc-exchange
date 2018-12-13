import { TestBed, async, inject } from '@angular/core/testing';

import { BuysellguardGuard } from './buysellguard.guard';

describe('BuysellguardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuysellguardGuard]
    });
  });

  it('should ...', inject([BuysellguardGuard], (guard: BuysellguardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
