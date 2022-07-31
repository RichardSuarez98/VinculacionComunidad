import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoTutorComponent } from './certificado-tutor.component';

describe('CertificadoTutorComponent', () => {
  let component: CertificadoTutorComponent;
  let fixture: ComponentFixture<CertificadoTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificadoTutorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificadoTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
