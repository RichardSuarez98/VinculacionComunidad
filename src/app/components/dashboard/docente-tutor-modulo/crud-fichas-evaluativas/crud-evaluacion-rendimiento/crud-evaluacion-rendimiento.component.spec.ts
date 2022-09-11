import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEvaluacionRendimientoComponent } from './crud-evaluacion-rendimiento.component';

describe('CrudEvaluacionRendimientoComponent', () => {
  let component: CrudEvaluacionRendimientoComponent;
  let fixture: ComponentFixture<CrudEvaluacionRendimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudEvaluacionRendimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudEvaluacionRendimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
