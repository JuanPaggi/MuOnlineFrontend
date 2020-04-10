import { TestBed } from '@angular/core/testing';

import { SvStatusService } from './sv-status.service';

describe('SvStatusService', () => {
  let service: SvStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
