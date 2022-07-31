import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudActividadesDiariasComponent } from './crud-actividades-diarias.component';

describe('CrudActividadesDiariasComponent', () => {
  let component: CrudActividadesDiariasComponent;
  let fixture: ComponentFixture<CrudActividadesDiariasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudActividadesDiariasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudActividadesDiariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
