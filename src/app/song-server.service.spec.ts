import { TestBed } from '@angular/core/testing';

import { SongServerService } from './song-server.service';

describe('SongServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongServerService = TestBed.get(SongServerService);
    expect(service).toBeTruthy();
  });
});
