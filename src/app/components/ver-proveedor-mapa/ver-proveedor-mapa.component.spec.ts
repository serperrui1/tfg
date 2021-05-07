import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProveedorMapaComponent } from './ver-proveedor-mapa.component';

describe('VerProveedorMapaComponent', () => {
  let component: VerProveedorMapaComponent;
  let fixture: ComponentFixture<VerProveedorMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerProveedorMapaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerProveedorMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
