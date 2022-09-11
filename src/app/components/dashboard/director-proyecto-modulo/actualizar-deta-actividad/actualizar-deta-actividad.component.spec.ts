import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarDetaActividadComponent } from './actualizar-deta-actividad.component';

describe('ActualizarDetaActividadComponent', () => {
  let component: ActualizarDetaActividadComponent;
  let fixture: ComponentFixture<ActualizarDetaActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarDetaActividadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarDetaActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
