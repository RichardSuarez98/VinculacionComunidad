import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoSupervisorComponent } from './certificado-supervisor.component';

describe('CertificadoSupervisorComponent', () => {
  let component: CertificadoSupervisorComponent;
  let fixture: ComponentFixture<CertificadoSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificadoSupervisorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificadoSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
