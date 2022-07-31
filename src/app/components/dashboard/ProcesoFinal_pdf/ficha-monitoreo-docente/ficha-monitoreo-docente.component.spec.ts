import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaMonitoreoDocenteComponent } from './ficha-monitoreo-docente.component';

describe('FichaMonitoreoDocenteComponent', () => {
  let component: FichaMonitoreoDocenteComponent;
  let fixture: ComponentFixture<FichaMonitoreoDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaMonitoreoDocenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaMonitoreoDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
