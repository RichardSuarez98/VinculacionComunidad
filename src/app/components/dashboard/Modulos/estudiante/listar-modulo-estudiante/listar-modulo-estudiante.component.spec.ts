import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarModuloEstudianteComponent } from './listar-modulo-estudiante.component';

describe('ListarModuloEstudianteComponent', () => {
  let component: ListarModuloEstudianteComponent;
  let fixture: ComponentFixture<ListarModuloEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarModuloEstudianteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarModuloEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
