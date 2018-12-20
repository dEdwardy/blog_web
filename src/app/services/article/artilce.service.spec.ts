import { TestBed, inject } from '@angular/core/testing';

import { ArtilceService } from './artilce.service';

describe('ArtilceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtilceService]
    });
  });

  it('should be created', inject([ArtilceService], (service: ArtilceService) => {
    expect(service).toBeTruthy();
  }));
});
