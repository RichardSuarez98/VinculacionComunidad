import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadEstudianteModuloComponent } from './actividad-estudiante-modulo.component';

describe('ActividadEstudianteModuloComponent', () => {
  let component: ActividadEstudianteModuloComponent;
  let fixture: ComponentFixture<ActividadEstudianteModuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadEstudianteModuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadEstudianteModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
