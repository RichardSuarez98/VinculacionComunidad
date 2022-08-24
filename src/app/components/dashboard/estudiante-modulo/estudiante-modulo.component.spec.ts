import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteModuloComponent } from './estudiante-modulo.component';

describe('EstudianteModuloComponent', () => {
  let component: EstudianteModuloComponent;
  let fixture: ComponentFixture<EstudianteModuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudianteModuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudianteModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
