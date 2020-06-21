import { TestBed } from '@angular/core/testing';

import { BracketstatusService } from './bracketstatus.service';

describe('BracketstatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BracketstatusService = TestBed.get(BracketstatusService);
    expect(service).toBeTruthy();
  });
});
