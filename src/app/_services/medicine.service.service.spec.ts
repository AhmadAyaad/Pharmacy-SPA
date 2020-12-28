/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Medicine.serviceService } from './medicine.service.service';

describe('Service: Medicine.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Medicine.serviceService]
    });
  });

  it('should ...', inject([Medicine.serviceService], (service: Medicine.serviceService) => {
    expect(service).toBeTruthy();
  }));
});
