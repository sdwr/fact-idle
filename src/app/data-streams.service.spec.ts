import { TestBed } from '@angular/core/testing';

import { DataStreamsService } from './data-streams.service';

describe('DataStreamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataStreamsService = TestBed.get(DataStreamsService);
    expect(service).toBeTruthy();
  });
});
