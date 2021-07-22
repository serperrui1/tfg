import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { of } from 'rxjs';
import { RegisterProveedorComponent } from './register-proveedor.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('Registroproveedor', () => {
  let usuarioService:UsuarioService
  let fb:FormBuilder
  let component: RegisterProveedorComponent;
  let fixture: ComponentFixture<RegisterProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterProveedorComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers:[
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]

    })
    .compileComponents();
    fixture = TestBed.createComponent(RegisterProveedorComponent);
    window['gapi'] = {
      load() {
        return null;
      },
      anotherFunction() {
        return null;
      },
   
    }
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService)
    fb = TestBed.inject(FormBuilder)
    fixture.detectChanges(); 
    
  });

  describe('Formulario crear proveedor', () => {
    it('Formulario: Iniciado correctamente', () => {
      let nombreEmpresa = component.registrarProveedorForm.controls['nombreEmpresa']
      let autonomo = component.registrarProveedorForm.controls['autonomo']
      let email = component.registrarProveedorForm.controls['email']
      let password = component.registrarProveedorForm.controls['password']
      let password2 = component.registrarProveedorForm.controls['password2']
      let sector = component.registrarProveedorForm.controls['sector']
      let registroMercantil = component.registrarProveedorForm.controls['registroMercantil']
      let nif = component.registrarProveedorForm.controls['nif']
      let direccion = component.registrarProveedorForm.controls['direccion']
      let lat = component.registrarProveedorForm.controls['lat']
      let lng = component.registrarProveedorForm.controls['lng']
      let cuentaBancariaIBAN = component.registrarProveedorForm.controls['cuentaBancariaIBAN']
      let titularCuenta = component.registrarProveedorForm.controls['titularCuenta']
      let terminos = component.registrarProveedorForm.controls['terminos']
      
      expect(nombreEmpresa.value).toEqual('')
      expect(autonomo.value).toEqual(false)
      expect(email.value).toEqual('')
      expect(password.value).toEqual('')
      expect(password2.value).toEqual('')
      expect(sector.value).toEqual('Libros, Música, Vídeo y DVD')
      expect(registroMercantil.value).toEqual('')
      expect(nif.value).toEqual('')
      expect(direccion.value).toEqual('')
      expect(lat.value).toEqual('')
      expect(lng.value).toEqual('')
      expect(cuentaBancariaIBAN.value).toEqual('')
      expect(titularCuenta.value).toEqual('')
      expect(terminos.value).toEqual('')



      expect(component.registrarProveedorForm.valid).toBeFalsy()
    })
  
    it('Formulario: Validado', () => {
      let nombreEmpresa = component.registrarProveedorForm.controls['nombreEmpresa']
      let autonomo = component.registrarProveedorForm.controls['autonomo']
      let email = component.registrarProveedorForm.controls['email']
      let password = component.registrarProveedorForm.controls['password']
      let password2 = component.registrarProveedorForm.controls['password2']
      let sector = component.registrarProveedorForm.controls['sector']
      let registroMercantil = component.registrarProveedorForm.controls['registroMercantil']
      let nif = component.registrarProveedorForm.controls['nif']
      let direccion = component.registrarProveedorForm.controls['direccion']
      let lat = component.registrarProveedorForm.controls['lat']
      let lng = component.registrarProveedorForm.controls['lng']
      let cuentaBancariaIBAN = component.registrarProveedorForm.controls['cuentaBancariaIBAN']
      let titularCuenta = component.registrarProveedorForm.controls['titularCuenta']
      let terminos = component.registrarProveedorForm.controls['terminos']
      
      nombreEmpresa.setValue('Nombre empresa')
      autonomo.setValue(false)
      email.setValue('prueba@gmail.com')
      password.setValue('123456')
      password2.setValue('123456')
      sector.setValue('Libros, Música, Vídeo y DVD')
      registroMercantil.setValue('B-98822921')
      nif.setValue('')
      direccion.setValue('Direccion de prueba')
      lat.setValue('15.21')
      lng.setValue('20')
      cuentaBancariaIBAN.setValue('ES1000492352082414205416')
      titularCuenta.setValue('Antonio Mata')
      terminos.setValue(true)

      expect(component.registrarProveedorForm.valid).toBeTruthy()
    })
  })

  describe('Crear proveedor', () => {
    it('Formulario proveedor: Datos enviados correctamente', () => {
      let nombreEmpresa = component.registrarProveedorForm.controls['nombreEmpresa']
      let autonomo = component.registrarProveedorForm.controls['autonomo']
      let email = component.registrarProveedorForm.controls['email']
      let password = component.registrarProveedorForm.controls['password']
      let password2 = component.registrarProveedorForm.controls['password2']
      let sector = component.registrarProveedorForm.controls['sector']
      let registroMercantil = component.registrarProveedorForm.controls['registroMercantil']
      let nif = component.registrarProveedorForm.controls['nif']
      let direccion = component.registrarProveedorForm.controls['direccion']
      let lat = component.registrarProveedorForm.controls['lat']
      let lng = component.registrarProveedorForm.controls['lng']
      let cuentaBancariaIBAN = component.registrarProveedorForm.controls['cuentaBancariaIBAN']
      let titularCuenta = component.registrarProveedorForm.controls['titularCuenta']
      let terminos = component.registrarProveedorForm.controls['terminos']
      
      nombreEmpresa.setValue('Nombre empresa')
      autonomo.setValue(false)
      email.setValue('prueba@gmail.com')
      password.setValue('123456')
      password2.setValue('123456')
      sector.setValue('Libros, Música, Vídeo y DVD')
      registroMercantil.setValue('B-98822921')
      nif.setValue('')
      direccion.setValue('Direccion de prueba')
      lat.setValue('15.21')
      lng.setValue('20')
      cuentaBancariaIBAN.setValue('ES1000492352082414205416')
      titularCuenta.setValue('Antonio Mata')
      terminos.setValue(true)


      spyOn(usuarioService, 'crearProveedor').and.returnValue(of(''));
      component.crearProveedor()
      expect(usuarioService.crearProveedor).toHaveBeenCalledWith(component.registrarProveedorForm.value)
      expect(usuarioService.crearProveedor).toBeTruthy();
    })

    it('Formulario proveedor: Botón de submit funciona correctamente', () => {
      let nombreEmpresa = component.registrarProveedorForm.controls['nombreEmpresa']
      let autonomo = component.registrarProveedorForm.controls['autonomo']
      let email = component.registrarProveedorForm.controls['email']
      let password = component.registrarProveedorForm.controls['password']
      let password2 = component.registrarProveedorForm.controls['password2']
      let sector = component.registrarProveedorForm.controls['sector']
      let registroMercantil = component.registrarProveedorForm.controls['registroMercantil']
      let nif = component.registrarProveedorForm.controls['nif']
      let direccion = component.registrarProveedorForm.controls['direccion']
      let lat = component.registrarProveedorForm.controls['lat']
      let lng = component.registrarProveedorForm.controls['lng']
      let cuentaBancariaIBAN = component.registrarProveedorForm.controls['cuentaBancariaIBAN']
      let titularCuenta = component.registrarProveedorForm.controls['titularCuenta']
      let terminos = component.registrarProveedorForm.controls['terminos']
      
      nombreEmpresa.setValue('Nombre empresa')
      autonomo.setValue(false)
      email.setValue('prueba@gmail.com')
      password.setValue('123456')
      password2.setValue('123456')
      sector.setValue('Libros, Música, Vídeo y DVD')
      registroMercantil.setValue('B-98822921')
      nif.setValue('')
      direccion.setValue('Direccion de prueba')
      lat.setValue('15.21')
      lng.setValue('20')
      cuentaBancariaIBAN.setValue('ES1000492352082414205416')
      titularCuenta.setValue('Antonio Mata')
      terminos.setValue(true)
      spyOn(usuarioService, 'crearProveedor')
      const button = fixture.debugElement.nativeElement.querySelector('#submit');
      button.click();
      expect(usuarioService.crearProveedor).toHaveBeenCalled()
    })

    

    it('Formulario proveedor: Datos enviados erroneos', () => {
      let nombreEmpresa = component.registrarProveedorForm.controls['nombreEmpresa']
      let autonomo = component.registrarProveedorForm.controls['autonomo']
      let email = component.registrarProveedorForm.controls['email']
      let password = component.registrarProveedorForm.controls['password']
      let password2 = component.registrarProveedorForm.controls['password2']
      let sector = component.registrarProveedorForm.controls['sector']
      let registroMercantil = component.registrarProveedorForm.controls['registroMercantil']
      let nif = component.registrarProveedorForm.controls['nif']
      let direccion = component.registrarProveedorForm.controls['direccion']
      let lat = component.registrarProveedorForm.controls['lat']
      let lng = component.registrarProveedorForm.controls['lng']
      let cuentaBancariaIBAN = component.registrarProveedorForm.controls['cuentaBancariaIBAN']
      let titularCuenta = component.registrarProveedorForm.controls['titularCuenta']
      let terminos = component.registrarProveedorForm.controls['terminos']
      
      nombreEmpresa.setValue('Nombre empresa')
      autonomo.setValue(false)
      email.setValue('correosinarroba') //falta el @ del email
      password.setValue('123456')
      password2.setValue('123456')
      sector.setValue('Libros, Música, Vídeo y DVD')
      registroMercantil.setValue('B-98822921')
      nif.setValue('')
      direccion.setValue('Direccion de prueba')
      lat.setValue('15.21')
      lng.setValue('20')
      cuentaBancariaIBAN.setValue('ES1000492352082414205416')
      titularCuenta.setValue('Antonio Mata')
      terminos.setValue(true)

      expect(component.registrarProveedorForm.valid).toBeFalsy()
      
      spyOn(usuarioService, 'crearProveedor').and.returnValue(of('Contraseña incorrecta, introduzca la correcta asociada a esa cuenta.'));
      component.crearProveedor()
      expect(usuarioService.crearProveedor).not.toHaveBeenCalledWith(component.registrarProveedorForm.value)
    })
  })

});