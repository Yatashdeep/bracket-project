import { TestBed } from '@angular/core/testing';

import { EventnameService } from './eventname.service';

describe('EventnameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventnameService = TestBed.get(EventnameService);
    expect(service).toBeTruthy();
  });
});
