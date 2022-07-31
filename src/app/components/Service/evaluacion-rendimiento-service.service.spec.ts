import { TestBed } from '@angular/core/testing';

import { EvaluacionRendimientoServiceService } from './evaluacion-rendimiento-service.service';

describe('EvaluacionRendimientoServiceService', () => {
  let service: EvaluacionRendimientoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluacionRendimientoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
