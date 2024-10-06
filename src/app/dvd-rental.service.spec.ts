import { TestBed } from '@angular/core/testing';

import { DvdRentalService } from './dvd-rental.service';

describe('DvdRentalService', () => {
  let service: DvdRentalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DvdRentalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
