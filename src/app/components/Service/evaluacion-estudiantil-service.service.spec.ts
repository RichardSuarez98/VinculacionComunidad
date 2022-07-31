import { TestBed } from '@angular/core/testing';

import { EvaluacionEstudiantilServiceService } from './evaluacion-estudiantil-service.service';

describe('EvaluacionEstudiantilServiceService', () => {
  let service: EvaluacionEstudiantilServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluacionEstudiantilServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
