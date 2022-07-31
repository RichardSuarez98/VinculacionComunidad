import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEvaluacionRendimientoEstudianteComponent } from './ficha-evaluacion-rendimiento-estudiante.component';

describe('FichaEvaluacionRendimientoEstudianteComponent', () => {
  let component: FichaEvaluacionRendimientoEstudianteComponent;
  let fixture: ComponentFixture<FichaEvaluacionRendimientoEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaEvaluacionRendimientoEstudianteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaEvaluacionRendimientoEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
