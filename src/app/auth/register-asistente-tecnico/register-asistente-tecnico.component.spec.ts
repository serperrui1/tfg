import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { Observable, of} from 'rxjs';
import { RegisterAsistenteTecnicoComponent } from './register-asistente-tecnico.component';
import { Administrador } from 'src/app/models/administrador';

describe('Registro Asistente Técnico', () => {
  let usuarioService:UsuarioService
  let fb:FormBuilder
  let component: RegisterAsistenteTecnicoComponent;
  let fixture: ComponentFixture<RegisterAsistenteTecnicoComponent>;
  //let admin: Administrador= new Administrador("administrador","apellidos","admin@admin.es");

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAsistenteTecnicoComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ]

    })
    .compileComponents();
    fixture = TestBed.createComponent(RegisterAsistenteTecnicoComponent);
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
    //spyOn(usuarioService, 'getAdministrador').and.returnValue(Promise.resolve(admin));
    fixture.detectChanges(); 
    
  });

  describe('Formulario crear asistente Técnico', () => {
    it('Formulario: Iniciado correctamente', () => {
      

      let nombre = component.registrarAsistenteForm.controls['nombre']
      let apellidos = component.registrarAsistenteForm.controls['apellidos']
      let email = component.registrarAsistenteForm.controls['email']
      let password = component.registrarAsistenteForm.controls['password']
      let password2 = component.registrarAsistenteForm.controls['password2']
      let terminos = component.registrarAsistenteForm.controls['terminos']
      
      expect(email.value).toEqual('')
      expect(nombre.value).toEqual('')
      expect(apellidos.value).toEqual('')
      expect(password.value).toEqual('')
      expect(password2.value).toEqual('')
      expect(terminos.value).toEqual('')


      expect(component.registrarAsistenteForm.valid).toBeFalsy()
    })
  
    it('Formulario: Validado', () => {
      let nombre = component.registrarAsistenteForm.controls['nombre']
      let apellidos = component.registrarAsistenteForm.controls['apellidos']
      let email = component.registrarAsistenteForm.controls['email']
      let password = component.registrarAsistenteForm.controls['password']
      let password2 = component.registrarAsistenteForm.controls['password2']
      let terminos = component.registrarAsistenteForm.controls['terminos']

      email.setValue('emailprueba@gmail.com')
      nombre.setValue('nombre prueba')
      apellidos.setValue('apellidos prueba')
      password.setValue('123456')
      password2.setValue('123456')
      terminos.setValue(true)

      expect(component.registrarAsistenteForm.valid).toBeTruthy()
    })
  })

  describe('Crear asistente', () => {
    it('Formulario asistente: Datos enviados correctamente', () => {
      let nombre = component.registrarAsistenteForm.controls['nombre']
      let apellidos = component.registrarAsistenteForm.controls['apellidos']
      let email = component.registrarAsistenteForm.controls['email']
      let password = component.registrarAsistenteForm.controls['password']
      let password2 = component.registrarAsistenteForm.controls['password2']
      let terminos = component.registrarAsistenteForm.controls['terminos']
      
      email.setValue('emailprueba@gmail.com')
      nombre.setValue('nombre prueba')
      apellidos.setValue('apellidos prueba')
      password.setValue('123456')
      password2.setValue('123456')
      terminos.setValue(true)

      spyOn(usuarioService, 'crearAsistenteTecnico').and.returnValue(of(''));
      component.crearAsistente()
      expect(usuarioService.crearAsistenteTecnico).toHaveBeenCalledWith(component.registrarAsistenteForm.value)
      expect(usuarioService.crearAsistenteTecnico).toBeTruthy();
    })

    it('Formulario asistente: Botón de submit funciona correctamente', () => {
      let nombre = component.registrarAsistenteForm.controls['nombre']
      let apellidos = component.registrarAsistenteForm.controls['apellidos']
      let email = component.registrarAsistenteForm.controls['email']
      let password = component.registrarAsistenteForm.controls['password']
      let password2 = component.registrarAsistenteForm.controls['password2']
      let terminos = component.registrarAsistenteForm.controls['terminos']

      email.setValue('emailprueba@gmail.com')
      nombre.setValue('nombre prueba')
      apellidos.setValue('apellidos prueba')
      password.setValue('123456')
      password2.setValue('123456')
      terminos.setValue(true)
      spyOn(usuarioService, 'crearAsistenteTecnico')
      const button = fixture.debugElement.nativeElement.querySelector('#submit');
      button.click();
      expect(usuarioService.crearAsistenteTecnico).toHaveBeenCalled()
    })

    

    it('Formulario asistente: Datos enviados erroneos', () => {
      let nombre = component.registrarAsistenteForm.controls['nombre']
      let apellidos = component.registrarAsistenteForm.controls['apellidos']
      let email = component.registrarAsistenteForm.controls['email']
      let password = component.registrarAsistenteForm.controls['password']
      let password2 = component.registrarAsistenteForm.controls['password2']
      let terminos = component.registrarAsistenteForm.controls['terminos']

      email.setValue('emailprueba@gmail.com')
      nombre.setValue('nombre prueba')
      apellidos.setValue('apellidos prueba')
      password.setValue('123456')
      password2.setValue('1234567')
      terminos.setValue(true)

      expect(component.registrarAsistenteForm.valid).toBeFalsy()
      
      spyOn(usuarioService, 'crearAsistenteTecnico').and.returnValue(of('Contraseña incorrecta, introduzca la correcta asociada a esa cuenta.'));
      component.crearAsistente()
      expect(usuarioService.crearAsistenteTecnico).not.toHaveBeenCalledWith(component.registrarAsistenteForm.value)
    })
  })

});