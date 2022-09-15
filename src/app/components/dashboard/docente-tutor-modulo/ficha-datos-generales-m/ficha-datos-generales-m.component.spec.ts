import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaDatosGeneralesMComponent } from './ficha-datos-generales-m.component';

describe('FichaDatosGeneralesMComponent', () => {
  let component: FichaDatosGeneralesMComponent;
  let fixture: ComponentFixture<FichaDatosGeneralesMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaDatosGeneralesMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaDatosGeneralesMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
