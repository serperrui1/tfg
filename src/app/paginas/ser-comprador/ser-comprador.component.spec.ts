import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { Observable, of} from 'rxjs';
import { SerCompradorComponent } from './ser-comprador.component';
import { Proveedor } from 'src/app/models/proveedor';

describe('RegistroComprador', () => {
  let usuarioService:UsuarioService
  let fb:FormBuilder
  let component: SerCompradorComponent;
  let fixture: ComponentFixture<SerCompradorComponent>;
  let proveedorTest :Proveedor

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerCompradorComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ]

    })
    .compileComponents();

    proveedorTest = {
      nombreEmpresa: "Empresa test",
      autonomo: false,
      sector: "Informática",
      email: "empresa@test.com",
      direccion: "dirección test",
      cuentaBancariaIBAN: 'ES1000492352082414205416',
      titularCuenta: "Empresa ",
      img:"https://firebasestorage.googleapis.com/v0/b/sellersplaza-41a82.appspot.com/o/0.49014345173493457informatica-infocoste-min.jpg?alt=media&token=aa8ed00a-2178-438c-afea-d26e278e647f",
      fechaRegistro: new Date("2020-11-18T17:47:56.562+00:00"),
      registroMercantil: "B-46961041",
      posicion: {
        lat:30,
        lng:25
      },
      unidadesVendidas: 50,
      puntuacionMedia:3
    }

    fixture = TestBed.createComponent(SerCompradorComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder)
    component.usuario = "proveedor";
    component.proveedor = proveedorTest;
    component.emailDB = component.proveedor.email;
    component.yaSoyComprador = false
    window['gapi'] = {
      load() {
        return null;
      },
      anotherFunction() {
        return null;
      },
   
    }
    component.serCompradorForm = fb.group({
      nombre: [ '', Validators.required ],
      apellidos:['', Validators.required],
      email:[component.proveedor.email,/* [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]  */],
      password:['', [Validators.required, component.passwordFormatoNoValido]],
      password2:['', Validators.required],
      numeroTelefono: ['', [Validators.required, component.telefonoFormatoNoValido]],
      fechaNacimiento:['', [ Validators.required, component.fechaAnteriorAHoy]],
      paisResidencia: [ '', Validators.required ],
      ciudad: [ '', Validators.required ],
      localidad: [ '', Validators.required ],
      codigoPostal:['',[ Validators.required, component.codigoPostalFormatoNoValido] ],
      direccionResidencia: [ '', Validators.required ],
      terminos:['', Validators.required]

      }, {
        validators: component.passwordsIguales('password', 'password2')
      });
    usuarioService = TestBed.inject(UsuarioService)

    fixture.detectChanges(); 
    
  });

  describe('Formulario convertir en comprador', () => {
    it('Formulario: Iniciado correctamente', () => {
      let email = component.serCompradorForm.controls['email']
      let nombre = component.serCompradorForm.controls['nombre']
      let apellidos = component.serCompradorForm.controls['apellidos']
      let password = component.serCompradorForm.controls['password']
      let password2 = component.serCompradorForm.controls['password2']
      let numeroTelefono = component.serCompradorForm.controls['numeroTelefono']
      let fechaNacimiento = component.serCompradorForm.controls['fechaNacimiento']
      let paisResidencia = component.serCompradorForm.controls['paisResidencia']
      let ciudad = component.serCompradorForm.controls['ciudad']
      let localidad = component.serCompradorForm.controls['localidad']
      let direccionResidencia = component.serCompradorForm.controls['direccionResidencia']
      let codigoPostal = component.serCompradorForm.controls['codigoPostal']
      let terminos = component.serCompradorForm.controls['terminos']
      
      expect(email.value).toEqual(component.proveedor.email)
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


      expect(component.serCompradorForm.valid).toBeFalsy()
    })
  
    it('Formulario: Validado', () => {
      let email = component.serCompradorForm.controls['email']
      let nombre = component.serCompradorForm.controls['nombre']
      let apellidos = component.serCompradorForm.controls['apellidos']
      let password = component.serCompradorForm.controls['password']
      let password2 = component.serCompradorForm.controls['password2']
      let numeroTelefono = component.serCompradorForm.controls['numeroTelefono']
      let fechaNacimiento = component.serCompradorForm.controls['fechaNacimiento']
      let paisResidencia = component.serCompradorForm.controls['paisResidencia']
      let ciudad = component.serCompradorForm.controls['ciudad']
      let localidad = component.serCompradorForm.controls['localidad']
      let direccionResidencia = component.serCompradorForm.controls['direccionResidencia']
      let codigoPostal = component.serCompradorForm.controls['codigoPostal']
      let terminos = component.serCompradorForm.controls['terminos']
      
      email.setValue(component.proveedor.email)
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

      expect(component.serCompradorForm.valid).toBeTruthy()
    })
  })

  describe('Convertir comprador', () => {
    it('Formulario comprador: Datos enviados correctamente', () => {
      let email = component.serCompradorForm.controls['email']
      let nombre = component.serCompradorForm.controls['nombre']
      let apellidos = component.serCompradorForm.controls['apellidos']
      let password = component.serCompradorForm.controls['password']
      let password2 = component.serCompradorForm.controls['password2']
      let numeroTelefono = component.serCompradorForm.controls['numeroTelefono']
      let fechaNacimiento = component.serCompradorForm.controls['fechaNacimiento']
      let paisResidencia = component.serCompradorForm.controls['paisResidencia']
      let ciudad = component.serCompradorForm.controls['ciudad']
      let localidad = component.serCompradorForm.controls['localidad']
      let direccionResidencia = component.serCompradorForm.controls['direccionResidencia']
      let codigoPostal = component.serCompradorForm.controls['codigoPostal']
      let terminos = component.serCompradorForm.controls['terminos']
      
      email.setValue(component.proveedor.email)
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


      expect(component.serCompradorForm.valid).toBeTruthy()
      
      spyOn(usuarioService, 'crearComprador');
      component.crearComprador()
      expect(usuarioService.crearComprador).not.toHaveBeenCalledWith(component.serCompradorForm.value)

    })

    it('Formulario comprador: Botón de submit funciona correctamente', () => {
      let email = component.serCompradorForm.controls['email']
      let nombre = component.serCompradorForm.controls['nombre']
      let apellidos = component.serCompradorForm.controls['apellidos']
      let password = component.serCompradorForm.controls['password']
      let password2 = component.serCompradorForm.controls['password2']
      let numeroTelefono = component.serCompradorForm.controls['numeroTelefono']
      let fechaNacimiento = component.serCompradorForm.controls['fechaNacimiento']
      let paisResidencia = component.serCompradorForm.controls['paisResidencia']
      let ciudad = component.serCompradorForm.controls['ciudad']
      let localidad = component.serCompradorForm.controls['localidad']
      let direccionResidencia = component.serCompradorForm.controls['direccionResidencia']
      let codigoPostal = component.serCompradorForm.controls['codigoPostal']
      let terminos = component.serCompradorForm.controls['terminos']
      
      email.setValue(component.proveedor.email)
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
      expect(usuarioService.crearComprador).not.toHaveBeenCalledWith(component.serCompradorForm.value)
    })

    

    it('Formulario comprador: Datos enviados erroneos', () => {
      let email = component.serCompradorForm.controls['email']
      let nombre = component.serCompradorForm.controls['nombre']
      let apellidos = component.serCompradorForm.controls['apellidos']
      let password = component.serCompradorForm.controls['password']
      let password2 = component.serCompradorForm.controls['password2']
      let numeroTelefono = component.serCompradorForm.controls['numeroTelefono']
      let fechaNacimiento = component.serCompradorForm.controls['fechaNacimiento']
      let paisResidencia = component.serCompradorForm.controls['paisResidencia']
      let ciudad = component.serCompradorForm.controls['ciudad']
      let localidad = component.serCompradorForm.controls['localidad']
      let direccionResidencia = component.serCompradorForm.controls['direccionResidencia']
      let codigoPostal = component.serCompradorForm.controls['codigoPostal']
      let terminos = component.serCompradorForm.controls['terminos']
      
      email.setValue(component.proveedor.email)
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

      expect(component.serCompradorForm.valid).toBeFalsy()
      
      spyOn(usuarioService, 'crearComprador').and.returnValue(of('Contraseña incorrecta, introduzca la correcta asociada a esa cuenta.'));
      component.crearComprador()
      expect(usuarioService.crearComprador).not.toHaveBeenCalledWith(component.serCompradorForm.value)
    })
  })

});