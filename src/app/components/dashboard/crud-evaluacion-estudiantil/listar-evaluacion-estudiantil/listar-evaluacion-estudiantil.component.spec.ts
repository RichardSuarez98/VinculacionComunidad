import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEvaluacionEstudiantilComponent } from './listar-evaluacion-estudiantil.component';

describe('ListarEvaluacionEstudiantilComponent', () => {
  let component: ListarEvaluacionEstudiantilComponent;
  let fixture: ComponentFixture<ListarEvaluacionEstudiantilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEvaluacionEstudiantilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEvaluacionEstudiantilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
