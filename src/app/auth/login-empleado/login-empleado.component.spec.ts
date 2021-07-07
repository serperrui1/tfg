import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { LoginEmpleadoComponent } from './login-empleado.component';
import { Observable, of} from 'rxjs';

describe('Login', () => {
  let usuarioService:UsuarioService
  let fb:FormBuilder
  let component: LoginEmpleadoComponent;
  let fixture: ComponentFixture<LoginEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginEmpleadoComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ]

    })
    .compileComponents();
    fixture = TestBed.createComponent(LoginEmpleadoComponent);
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

  describe('Formulario', () => {
    it('Formulario: Iniciado correctamente', () => {
      let email = component.loginForm.controls['email']
      let password = component.loginForm.controls['password']
      let usuario = component.loginForm.controls['usuario']
      
      expect(email.value).toEqual('')
      expect(password.value).toEqual('')
      expect(usuario.value).toEqual('administrador')
      expect(component.loginForm.valid).toBeFalsy()
    })
  
    it('Formulario: Validado', () => {
      let email = component.loginForm.controls['email']
      let password = component.loginForm.controls['password']
      let usuario = component.loginForm.controls['usuario']
      email.setValue('lucsalcob_admin@sellersplaza.com')
      password.setValue('123456')
      usuario.setValue('administrador')
      expect(email.value).toEqual('lucsalcob_admin@sellersplaza.com')
      expect(password.value).toEqual('123456')
      expect(usuario.value).toEqual('administrador')
      expect(component.loginForm.valid).toBeTruthy()
    })
  })

  describe('Login', () => {
    it('Login: Datos enviados', () => {
      let email = component.loginForm.controls['email']
      let password = component.loginForm.controls['password']
      let usuario = component.loginForm.controls['usuario']
      email.setValue('lucsalcob_admin@sellersplaza.com')
      password.setValue('123456')
      usuario.setValue('administrador')
      spyOn(usuarioService, 'login').and.returnValue(of(''));
      component.login()
      expect(usuarioService.login).toHaveBeenCalledWith(component.loginForm.value)
    })
    
    // it('Login: Datos no enviados por password vacía', () => {
    //   let email = component.loginForm.controls['email']
    //   let password = component.loginForm.controls['password']
    //   let usuario = component.loginForm.controls['usuario']
    //   email.setValue('lucsalcob_admin@sellersplaza.com')
    //   password.setValue('')
    //   usuario.setValue('administrador')
    //   spyOn(usuarioService, 'login')
    //   component.login()
    //   expect(usuarioService.login).not.toHaveBeenCalled()
    // })

    it('Login: Botón de submit funciona correctamente', () => {
      let email = component.loginForm.controls['email']
      let password = component.loginForm.controls['password']
      let usuario = component.loginForm.controls['usuario']
      email.setValue('marcrodbuz_at@sellersplaza.com')
      password.setValue('123456')
      usuario.setValue('asistenteTecnico')
      spyOn(usuarioService, 'login')
      const button = fixture.debugElement.nativeElement.querySelector('#submit');
      button.click();
      expect(usuarioService.login).toHaveBeenCalled()
    })

    it('Login: Login exitoso', () => {
      let email = component.loginForm.controls['email']
      let password = component.loginForm.controls['password']
      let usuario = component.loginForm.controls['usuario']
      email.setValue('marcrodbuz_at@sellersplaza.com')
      password.setValue('123456')
      usuario.setValue('asistenteTecnico')
      spyOn(usuarioService, 'login').and.returnValue(of('Login exitoso'));
      component.login()
      expect(usuarioService.login).toHaveBeenCalled()

    })

    it('Login: Email incorrecto', () => {
      let email = component.loginForm.controls['email']
      let password = component.loginForm.controls['password']
      let usuario = component.loginForm.controls['usuario']
      email.setValue('testing@gmail.com')
      password.setValue('testing')
      usuario.setValue('proveedor')
      spyOn(usuarioService, 'login').and.returnValue(of('No existe cuenta con ese email.'))
      component.login()
      expect(usuarioService.login).toHaveBeenCalled()
    })

    it('Login: Password incorrecta', () => {
      let email = component.loginForm.controls['email']
      let password = component.loginForm.controls['password']
      let usuario = component.loginForm.controls['usuario']
      email.setValue('marcrodbuz_at@sellersplaza.com')
      password.setValue('testing')
      usuario.setValue('proveedor')
      spyOn(usuarioService, 'login').and.returnValue(of('Contraseña incorrecta, introduzca la correcta asociada a esa cuenta.'))
      component.login()
      expect(usuarioService.login).toHaveBeenCalled()
    })
  })

});