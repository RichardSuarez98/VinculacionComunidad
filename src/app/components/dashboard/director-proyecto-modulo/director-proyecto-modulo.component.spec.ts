import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorProyectoModuloComponent } from './director-proyecto-modulo.component';

describe('DirectorProyectoModuloComponent', () => {
  let component: DirectorProyectoModuloComponent;
  let fixture: ComponentFixture<DirectorProyectoModuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorProyectoModuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorProyectoModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
