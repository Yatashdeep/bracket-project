import { TestBed } from '@angular/core/testing';

import { UserserviceServiceService } from './userservice-service.service';

describe('UserserviceServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserserviceServiceService = TestBed.get(UserserviceServiceService);
    expect(service).toBeTruthy();
  });
});
