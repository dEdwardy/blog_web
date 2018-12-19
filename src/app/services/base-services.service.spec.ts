import { TestBed, inject } from '@angular/core/testing';

import { BaseServicesService } from './base-services.service';

describe('BaseServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseServicesService]
    });
  });

  it('should be created', inject([BaseServicesService], (service: BaseServicesService) => {
    expect(service).toBeTruthy();
  }));
});
