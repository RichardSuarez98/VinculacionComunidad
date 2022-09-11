import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleADComponent } from './detalle-ad.component';

describe('DetalleADComponent', () => {
  let component: DetalleADComponent;
  let fixture: ComponentFixture<DetalleADComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleADComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleADComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
