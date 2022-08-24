import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteTutorModuloComponent } from './docente-tutor-modulo.component';

describe('DocenteTutorModuloComponent', () => {
  let component: DocenteTutorModuloComponent;
  let fixture: ComponentFixture<DocenteTutorModuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocenteTutorModuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocenteTutorModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
