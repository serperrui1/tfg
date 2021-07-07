import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { Observable, of} from 'rxjs';
import { RegisterCompradorComponent } from './register-comprador.component';

describe('RegistroComprador', () => {
  let usuarioService:UsuarioService
  let fb:FormBuilder
  let component: RegisterCompradorComponent;
  let fixture: ComponentFixture<RegisterCompradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCompradorComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ]

    })
    .compileComponents();
    fixture = TestBed.createComponent(RegisterCompradorComponent);
    component = fixture.componentInstance;
    window['gapi'] = {
      load() {
        return null;
      },
      anotherFunction() {
        return null;
      },
   
    }
    usuarioService = TestBed.inject(UsuarioService)
    fb = TestBed.inject(FormBuilder)
    fixture.detectChanges(); 
    
  });

  describe('Formulario crear comprador', () => {
    it('Formulario: Iniciado correctamente', () => {
      let email = component.registrarCompradorForm.controls['email']
      let nombre = component.registrarCompradorForm.controls['nombre']
      let apellidos = component.registrarCompradorForm.controls['apellidos']
      let password = component.registrarCompradorForm.controls['password']
      let password2 = component.registrarCompradorForm.controls['password2']
      let numeroTelefono = component.registrarCompradorForm.controls['numeroTelefono']
      let fechaNacimiento = component.registrarCompradorForm.controls['fechaNacimiento']
      let paisResidencia = component.registrarCompradorForm.controls['paisResidencia']
      let ciudad = component.registrarCompradorForm.controls['ciudad']
      let localidad = component.registrarCompradorForm.controls['localidad']
      let direccionResidencia = component.registrarCompradorForm.controls['direccionResidencia']
      let codigoPostal = component.registrarCompradorForm.controls['codigoPostal']
      let terminos = component.registrarCompradorForm.controls['terminos']
      
      expect(email.value).toEqual('')
      expect(nombre.value).toEqual('')
      expect(apellidos.value).toEqual('')
      expect(password.value).toEqual('')
      expect(password2.value).toEqual('')
      expect(numeroTelefono.value).toEqual('')
      expect(fechaNacimiento.value).toEqual('')
      expect(paisResidencia.value).toEqual('')
      expect(ciudad.value).toEqual('')
      expect(localidad.value).toEqual('')
      expect(direccionResidencia.value).toEqual('')
      expect(codigoPostal.value).toEqual('')
      expect(terminos.value).toEqual('')


      expect(component.registrarCompradorForm.valid).toBeFalsy()
    })
  
    it('Formulario: Validado', () => {
      let email = component.registrarCompradorForm.controls['email']
      let nombre = component.registrarCompradorForm.controls['nombre']
      let apellidos = component.registrarCompradorForm.controls['apellidos']
      let password = component.registrarCompradorForm.controls['password']
      let password2 = component.registrarCompradorForm.controls['password2']
      let numeroTelefono = component.registrarCompradorForm.controls['numeroTelefono']
      let fechaNacimiento = component.registrarCompradorForm.controls['fechaNacimiento']
      let paisResidencia = component.registrarCompradorForm.controls['paisResidencia']
      let ciudad = component.registrarCompradorForm.controls['ciudad']
      let localidad = component.registrarCompradorForm.controls['localidad']
      let direccionResidencia = component.registrarCompradorForm.controls['direccionResidencia']
      let codigoPostal = component.registrarCompradorForm.controls['codigoPostal']
      let terminos = component.registrarCompradorForm.controls['terminos']
      
      email.setValue('emailprueba@gmail.com')
      nombre.setValue('nombre prueba')
      apellidos.setValue('apellidos prueba')
      password.setValue('123456')
      password2.setValue('123456')
      numeroTelefono.setValue(654321653)
      fechaNacimiento.setValue('1994-11-18')
      paisResidencia.setValue('España')
      ciudad.setValue('Sevilla')
      localidad.setValue('Sevilla')
      direccionResidencia.setValue('mi casa de prueba')
      codigoPostal.setValue('41990')
      terminos.setValue(true)

      expect(component.registrarCompradorForm.valid).toBeTruthy()
    })
  })

  describe('Crear comprador', () => {
    it('Formulario comprador: Datos enviados correctamente', () => {
      let email = component.registrarCompradorForm.controls['email']
      let nombre = component.registrarCompradorForm.controls['nombre']
      let apellidos = component.registrarCompradorForm.controls['apellidos']
      let password = component.registrarCompradorForm.controls['password']
      let password2 = component.registrarCompradorForm.controls['password2']
      let numeroTelefono = component.registrarCompradorForm.controls['numeroTelefono']
      let fechaNacimiento = component.registrarCompradorForm.controls['fechaNacimiento']
      let paisResidencia = component.registrarCompradorForm.controls['paisResidencia']
      let ciudad = component.registrarCompradorForm.controls['ciudad']
      let localidad = component.registrarCompradorForm.controls['localidad']
      let direccionResidencia = component.registrarCompradorForm.controls['direccionResidencia']
      let codigoPostal = component.registrarCompradorForm.controls['codigoPostal']
      let terminos = component.registrarCompradorForm.controls['terminos']
      
      email.setValue('emailprueba@gmail.com')
      nombre.setValue('nombre prueba')
      apellidos.setValue('apellidos prueba')
      password.setValue('123456')
      password2.setValue('123456')
      numeroTelefono.setValue(654321653)
      fechaNacimiento.setValue('1994-11-18')
      paisResidencia.setValue('España')
      ciudad.setValue('Sevilla')
      localidad.setValue('Sevilla')
      direccionResidencia.setValue('mi casa de prueba')
      codigoPostal.setValue('41990')
      terminos.setValue(true)

      spyOn(usuarioService, 'crearComprador').and.returnValue(of(''));
      component.crearComprador()
      expect(usuarioService.crearComprador).toHaveBeenCalledWith(component.registrarCompradorForm.value)
      expect(usuarioService.crearComprador).toBeTruthy();
    })

    it('Formulario comprador: Botón de submit funciona correctamente', () => {
      let email = component.registrarCompradorForm.controls['email']
      let nombre = component.registrarCompradorForm.controls['nombre']
      let apellidos = component.registrarCompradorForm.controls['apellidos']
      let password = component.registrarCompradorForm.controls['password']
      let password2 = component.registrarCompradorForm.controls['password2']
      let numeroTelefono = component.registrarCompradorForm.controls['numeroTelefono']
      let fechaNacimiento = component.registrarCompradorForm.controls['fechaNacimiento']
      let paisResidencia = component.registrarCompradorForm.controls['paisResidencia']
      let ciudad = component.registrarCompradorForm.controls['ciudad']
      let localidad = component.registrarCompradorForm.controls['localidad']
      let direccionResidencia = component.registrarCompradorForm.controls['direccionResidencia']
      let codigoPostal = component.registrarCompradorForm.controls['codigoPostal']
      let terminos = component.registrarCompradorForm.controls['terminos']
      
      email.setValue('emailprueba@gmail.com')
      nombre.setValue('nombre prueba')
      apellidos.setValue('apellidos prueba')
      password.setValue('123456')
      password2.setValue('123456')
      numeroTelefono.setValue(654321653)
      fechaNacimiento.setValue('1994-11-18')
      paisResidencia.setValue('España')
      ciudad.setValue('Sevilla')
      localidad.setValue('Sevilla')
      direccionResidencia.setValue('mi casa de prueba')
      codigoPostal.setValue('41990')
      terminos.setValue(true)
      spyOn(usuarioService, 'crearComprador')
      const button = fixture.debugElement.nativeElement.querySelector('#submit');
      button.click();
      expect(usuarioService.crearComprador).toHaveBeenCalled()
    })

    

    it('Formulario comprador: Datos enviados erroneos', () => {
      let email = component.registrarCompradorForm.controls['email']
      let nombre = component.registrarCompradorForm.controls['nombre']
      let apellidos = component.registrarCompradorForm.controls['apellidos']
      let password = component.registrarCompradorForm.controls['password']
      let password2 = component.registrarCompradorForm.controls['password2']
      let numeroTelefono = component.registrarCompradorForm.controls['numeroTelefono']
      let fechaNacimiento = component.registrarCompradorForm.controls['fechaNacimiento']
      let paisResidencia = component.registrarCompradorForm.controls['paisResidencia']
      let ciudad = component.registrarCompradorForm.controls['ciudad']
      let localidad = component.registrarCompradorForm.controls['localidad']
      let direccionResidencia = component.registrarCompradorForm.controls['direccionResidencia']
      let codigoPostal = component.registrarCompradorForm.controls['codigoPostal']
      let terminos = component.registrarCompradorForm.controls['terminos']
      
      email.setValue('emailprueba@gmail.com')
      nombre.setValue('nombre prueba')
      apellidos.setValue('apellidos prueba')
      password.setValue('123456')
      password2.setValue('1234567')
      numeroTelefono.setValue(654321653)
      fechaNacimiento.setValue('1994-11-18')
      paisResidencia.setValue(6666)
      ciudad.setValue('Sevilla')
      localidad.setValue('Sevilla')
      direccionResidencia.setValue('mi casa de prueba')
      codigoPostal.setValue('41990')
      terminos.setValue(true)

      expect(component.registrarCompradorForm.valid).toBeFalsy()
      
      spyOn(usuarioService, 'crearComprador').and.returnValue(of('Contraseña incorrecta, introduzca la correcta asociada a esa cuenta.'));
      component.crearComprador()
      expect(usuarioService.crearComprador).not.toHaveBeenCalledWith(component.registrarCompradorForm.value)
    })
  })

});