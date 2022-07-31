import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEvaluacionEstudiantilComponent } from './ficha-evaluacion-estudiantil.component';

describe('FichaEvaluacionEstudiantilComponent', () => {
  let component: FichaEvaluacionEstudiantilComponent;
  let fixture: ComponentFixture<FichaEvaluacionEstudiantilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaEvaluacionEstudiantilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaEvaluacionEstudiantilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
