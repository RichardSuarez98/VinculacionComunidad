import { TestBed } from '@angular/core/testing';

import { MonitoreoDocenteServiceService } from './monitoreo-docente-service.service';

describe('MonitoreoDocenteServiceService', () => {
  let service: MonitoreoDocenteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoreoDocenteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
