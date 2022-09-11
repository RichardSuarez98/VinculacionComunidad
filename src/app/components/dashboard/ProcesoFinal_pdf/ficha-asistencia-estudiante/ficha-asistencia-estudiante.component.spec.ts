import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaAsistenciaEstudianteComponent } from './ficha-asistencia-estudiante.component';

describe('FichaAsistenciaEstudianteComponent', () => {
  let component: FichaAsistenciaEstudianteComponent;
  let fixture: ComponentFixture<FichaAsistenciaEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaAsistenciaEstudianteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaAsistenciaEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
