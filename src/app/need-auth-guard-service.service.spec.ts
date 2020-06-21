import { TestBed } from '@angular/core/testing';

import { NeedAuthGuardServiceService } from './need-auth-guard-service.service';

describe('NeedAuthGuardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NeedAuthGuardServiceService = TestBed.get(NeedAuthGuardServiceService);
    expect(service).toBeTruthy();
  });
});
