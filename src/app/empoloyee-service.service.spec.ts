import { TestBed } from '@angular/core/testing';

import { EmpoloyeeServiceService } from './empoloyee-service.service';

describe('EmpoloyeeServiceService', () => {
  let service: EmpoloyeeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpoloyeeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
