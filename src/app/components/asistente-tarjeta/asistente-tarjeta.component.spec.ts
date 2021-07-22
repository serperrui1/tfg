import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { AsistenteTarjetaComponent } from './asistente-tarjeta.component';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AsistenteTecnico } from 'src/app/models/asistente';
import { Administrador } from 'src/app/models/administrador';


describe('ProveedorTarjeta', () => {
  let usuarioService:UsuarioService
  let component: AsistenteTarjetaComponent;
  let fixture: ComponentFixture<AsistenteTarjetaComponent>;
  let asistenteTest: AsistenteTecnico;
  let router:Router;
  let admin:Administrador = new Administrador("nombre", "apellidos", "email@test.com")

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenteTarjetaComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]

    })
    .compileComponents();
      asistenteTest = {
        nombre: "Asistente test",
        apellidos: "Romero",
        email: "asistente@test.com",
        password: "123456789",
        img:"https://imagen.jpg"
      }
      fixture = TestBed.createComponent(AsistenteTarjetaComponent);
      component = fixture.componentInstance;
      component.asistente = asistenteTest;
      component.admin = admin;
      usuarioService = TestBed.inject(UsuarioService);
      fixture.detectChanges();
  }),

  describe('Comprobar imagen Firebase', () => {
    

    it('Imagen de firebase: True', () => {
      expect(component.imagenFirebase).toBeTrue()
      expect(component.noImagen).toBeFalse()
    })

  
    it('Imagen de firebase: False', () => {
      fixture.detectChanges();
      asistenteTest.img = "noesFirebase";

      fixture.whenStable();

      expect(component.asistente.img).toEqual('noesFirebase')
    })


  })

  describe('HTML asistente tarjeta', () => {
   
    it('Nombre, apellidos y email correctos', () => {
      let nombre = component.asistente.nombre;
      let apellidos = component.asistente.apellidos;
      let email = component.asistente.email;

      const nombreHtml = fixture.debugElement.nativeElement.querySelector('#nombre');
      const emailHtml = fixture.debugElement.nativeElement.querySelector('#email');

      expect(nombreHtml.innerHTML).toEqual(nombre +" " +  apellidos);
      expect(emailHtml.innerHTML).toEqual(email);
    })
    it('Click botón de eliminar Asistente: correcto', () => {
      spyOn(usuarioService, 'getAdministrador').and.returnValue(Promise.resolve(admin));
      usuarioService.getAdministrador();
      
      spyOn(component, 'borrarAsistente');
      let button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
      fixture.whenStable().then(() => {
        expect(component.borrarAsistente()).toHaveBeenCalled();
      });
      




      // spyOn(usuarioService, 'borrarAsistenteTecnico')

      // expect(usuarioService.borrarAsistenteTecnico).toHaveBeenCalled()
      })

});
})