import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaActividadesDiariasComponent } from './ficha-actividades-diarias.component';

describe('FichaActividadesDiariasComponent', () => {
  let component: FichaActividadesDiariasComponent;
  let fixture: ComponentFixture<FichaActividadesDiariasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaActividadesDiariasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaActividadesDiariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
