import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMonitoreoDocenteComponent } from './listar-monitoreo-docente.component';

describe('ListarMonitoreoDocenteComponent', () => {
  let component: ListarMonitoreoDocenteComponent;
  let fixture: ComponentFixture<ListarMonitoreoDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMonitoreoDocenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMonitoreoDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
