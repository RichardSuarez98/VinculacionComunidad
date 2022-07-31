import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaDatosGeneralesComponent } from './ficha-datos-generales.component';

describe('FichaDatosGeneralesComponent', () => {
  let component: FichaDatosGeneralesComponent;
  let fixture: ComponentFixture<FichaDatosGeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaDatosGeneralesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaDatosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
