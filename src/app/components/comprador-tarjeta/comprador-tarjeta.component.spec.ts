import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompradorTarjetaComponent } from './comprador-tarjeta.component';

describe('CompradorTarjetaComponent', () => {
  let component: CompradorTarjetaComponent;
  let fixture: ComponentFixture<CompradorTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompradorTarjetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompradorTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
