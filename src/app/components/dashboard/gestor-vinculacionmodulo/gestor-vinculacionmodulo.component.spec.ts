import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorVinculacionmoduloComponent } from './gestor-vinculacionmodulo.component';

describe('GestorVinculacionmoduloComponent', () => {
  let component: GestorVinculacionmoduloComponent;
  let fixture: ComponentFixture<GestorVinculacionmoduloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorVinculacionmoduloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorVinculacionmoduloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
