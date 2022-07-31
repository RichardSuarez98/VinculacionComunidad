import { TestBed } from '@angular/core/testing';

import { ListarModuloEstudianteService } from './listar-modulo-estudiante.service';

describe('ListarModuloEstudianteService', () => {
  let service: ListarModuloEstudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarModuloEstudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
