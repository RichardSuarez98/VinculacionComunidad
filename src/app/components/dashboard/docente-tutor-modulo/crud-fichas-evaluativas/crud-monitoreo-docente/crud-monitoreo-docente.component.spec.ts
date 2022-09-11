import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudMonitoreoDocenteComponent } from './crud-monitoreo-docente.component';

describe('CrudMonitoreoDocenteComponent', () => {
  let component: CrudMonitoreoDocenteComponent;
  let fixture: ComponentFixture<CrudMonitoreoDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudMonitoreoDocenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudMonitoreoDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
