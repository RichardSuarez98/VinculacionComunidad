import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEvaluacionRendimientoComponent } from './listar-evaluacion-rendimiento.component';

describe('ListarEvaluacionRendimientoComponent', () => {
  let component: ListarEvaluacionRendimientoComponent;
  let fixture: ComponentFixture<ListarEvaluacionRendimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEvaluacionRendimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEvaluacionRendimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
