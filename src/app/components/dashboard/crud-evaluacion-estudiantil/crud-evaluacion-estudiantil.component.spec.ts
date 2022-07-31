import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEvaluacionEstudiantilComponent } from './crud-evaluacion-estudiantil.component';

describe('CrudEvaluacionEstudiantilComponent', () => {
  let component: CrudEvaluacionEstudiantilComponent;
  let fixture: ComponentFixture<CrudEvaluacionEstudiantilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudEvaluacionEstudiantilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudEvaluacionEstudiantilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
