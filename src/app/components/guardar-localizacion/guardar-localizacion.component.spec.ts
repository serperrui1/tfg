import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarLocalizacionComponent } from './guardar-localizacion.component';

describe('GuardarLocalizacionComponent', () => {
  let component: GuardarLocalizacionComponent;
  let fixture: ComponentFixture<GuardarLocalizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarLocalizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardarLocalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
