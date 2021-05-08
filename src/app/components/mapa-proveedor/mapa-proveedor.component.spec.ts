import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaProveedorComponent } from './mapa-proveedor.component';

describe('MapaProveedorComponent', () => {
  let component: MapaProveedorComponent;
  let fixture: ComponentFixture<MapaProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
