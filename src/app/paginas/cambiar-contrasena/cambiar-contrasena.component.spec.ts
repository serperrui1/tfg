import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { CambiarContrasenaComponent } from './cambiar-contrasena.component';

import { of } from 'rxjs';
import { SpamValidator } from 'src/app/Validaciones-Customizadas.directive';

describe('Cambiar contraseña', () => {
  let usuarioService:UsuarioService
  let fb:FormBuilder
  let component: CambiarContrasenaComponent;
  let fixture: ComponentFixture<CambiarContrasenaComponent>;
  let expresionesSpam = ["spam1", "spam2"]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarContrasenaComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ]

    })
    .compileComponents();
    fixture = TestBed.createComponent(CambiarContrasenaComponent);
    window['gapi'] = {
      load() {
        return null;
      },
      anotherFunction() {
        return null;
      },
   
    }
    
    component = fixture.componentInstance;
    component.expresionesSpam = expresionesSpam;
    fb = TestBed.inject(FormBuilder)
    component.contrasenaForm = fb.group({
      password:['', [Validators.required, component.passwordFormatoNoValido, SpamValidator(expresionesSpam)]],
      nuevaPassword:['', [Validators.required,component.passwordFormatoNoValido, SpamValidator(expresionesSpam)]],
      nuevaPassword2:['', [Validators.required,  SpamValidator(expresionesSpam)]],
    },{
      validators: component.passwordsIguales('nuevaPassword', 'nuevaPassword2')
    })
    usuarioService = TestBed.inject(UsuarioService)

    fixture.detectChanges(); 
    
  });

  describe('Formulario cambiar contraseña', () => {
    it('Formulario: Iniciado correctamente', () => {

        
      let password = component.contrasenaForm.controls['password']
      let nuevaPassword = component.contrasenaForm.controls['nuevaPassword']
      let nuevaPassword2 = component.contrasenaForm.controls['nuevaPassword2']
      
      
      expect(password.value).toEqual('')
      expect(nuevaPassword.value).toEqual('')
      expect(nuevaPassword2.value).toEqual('')

      expect(component.contrasenaForm.valid).toBeFalsy()


    })
  
    it('Formulario Válido', () => {
      
      let password = component.contrasenaForm.controls['password']
      let nuevaPassword = component.contrasenaForm.controls['nuevaPassword']
      let nuevaPassword2 = component.contrasenaForm.controls['nuevaPassword2']

      password.setValue('123456')
      nuevaPassword.setValue('654321')
      nuevaPassword2.setValue('654321')

      expect(component.contrasenaForm.valid).toBeTruthy()
    })
    it('Formulario NO Válido', () => {
      let password = component.contrasenaForm.controls['password']
      let nuevaPassword = component.contrasenaForm.controls['nuevaPassword']
      let nuevaPassword2 = component.contrasenaForm.controls['nuevaPassword2']
      
      password.setValue('123456')
      nuevaPassword.setValue('12345')
      nuevaPassword2.setValue('654321')

      expect(component.contrasenaForm.valid).toBeFalsy();

    })
  })
  it('Botón de cambiar contraseña con formulario válido', () => {
    let password = component.contrasenaForm.controls['password']
    let nuevaPassword = component.contrasenaForm.controls['nuevaPassword']
    let nuevaPassword2 = component.contrasenaForm.controls['nuevaPassword2']
    
    password.setValue('123456')
    nuevaPassword.setValue('12345')
    nuevaPassword2.setValue('654321')

    expect(component.contrasenaForm.valid).toBeFalsy();

    
    spyOn(component, 'cambiarContrasena')
    const button = fixture.debugElement.nativeElement.querySelector('#submit');
    button.click();
    expect(component.cambiarContrasena).toHaveBeenCalled()
  })

  it('Botón de cambiar contraseña con formulario NO válido', () => {
    let password = component.contrasenaForm.controls['password']
    let nuevaPassword = component.contrasenaForm.controls['nuevaPassword']
    let nuevaPassword2 = component.contrasenaForm.controls['nuevaPassword2']
    
    password.setValue('123456')
    nuevaPassword.setValue('12345')
    nuevaPassword2.setValue('654321')

    expect(component.contrasenaForm.valid).toBeFalsy();

    
    spyOn(component, 'cambiarContrasena')
    const button = fixture.debugElement.nativeElement.querySelector('#submit');
    button.click();
    expect(component.cambiarContrasena).toHaveBeenCalled();
    expect(component.contrasenaForm.markAsTouched).toBeTruthy();
    
  })

  
});