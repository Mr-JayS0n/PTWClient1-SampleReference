import { TestBed } from '@angular/core/testing';

import { SignalRHubService } from './signal-rhub.service';

describe('SignalRHubService', () => {
  let service: SignalRHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalRHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
