import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenteTarjetaComponent } from './asistente-tarjeta.component';

describe('AsistenteTarjetaComponent', () => {
  let component: AsistenteTarjetaComponent;
  let fixture: ComponentFixture<AsistenteTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenteTarjetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenteTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
