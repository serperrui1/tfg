import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAsistenteTecnicoComponent } from './register-asistente-tecnico.component';

describe('RegisterAsistenteTecnicoComponent', () => {
  let component: RegisterAsistenteTecnicoComponent;
  let fixture: ComponentFixture<RegisterAsistenteTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAsistenteTecnicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAsistenteTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
