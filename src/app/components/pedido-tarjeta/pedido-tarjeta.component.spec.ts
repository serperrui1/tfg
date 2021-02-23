import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoTarjetaComponent } from './pedido-tarjeta.component';

describe('PedidoTarjetaComponent', () => {
  let component: PedidoTarjetaComponent;
  let fixture: ComponentFixture<PedidoTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoTarjetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
