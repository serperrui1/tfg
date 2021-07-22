import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CompradorTarjetaComponent } from './comprador-tarjeta.component';
import { Comprador } from 'src/app/models/comprador';
import { Administrador } from 'src/app/models/administrador';


describe('ProveedorTarjeta', () => {
  let usuarioService:UsuarioService
  let component: CompradorTarjetaComponent;
  let fixture: ComponentFixture<CompradorTarjetaComponent>;
  let compradorTest: Comprador;
  let router:Router;
  let admin:Administrador = new Administrador("nombre", "apellidos", "email@test.com")

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompradorTarjetaComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]

    })
    .compileComponents();
      compradorTest = {
        nombre: "nombre prueba",
        apellidos: "apellidos prueba",
        email: "emailprueba@gmail.com",
        fechaNacimiento: "2000-11-18",
        password: "123456",
        paisResidencia: 'España',
        ciudad: "Sevilla ",
        localidad:"Sevilla",
        direccionResidencia: "mi casa de prueba",
        codigoPostal: 41940,
        numeroTelefono:666332211,
        img:"https://firebasestorage.googleapis.com/v0/b/sellersplaza-41a82.appspot.com/o/0.056040226046601305e48791f1-51ca-4cc3-aa8b-f9d135917dab.jpeg?alt=media&token=3b6f30bd-3d6c-4b71-8a9c-664b12485d10"
      }
      fixture = TestBed.createComponent(CompradorTarjetaComponent);
      component = fixture.componentInstance;
      component.comprador = compradorTest;
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
      compradorTest.img = "noesFirebase";

      fixture.whenStable();

      expect(component.comprador.img).toEqual('noesFirebase')
    })


  })

  describe('HTML producto tarjeta', () => {
   
    it('Título, precio y unidades vendidas correctos', () => {
      let nombre = component.comprador.nombre;
      let apellidos = component.comprador.apellidos;
      let email = component.comprador.email;
      let numeroTelefono = component.comprador.numeroTelefono;

      const nombreHtml = fixture.debugElement.nativeElement.querySelector('#nombre');
      const emailHtml = fixture.debugElement.nativeElement.querySelector('#email');
      const numeroTelefonoHtml = fixture.debugElement.nativeElement.querySelector('#numeroTelefono');
    


      expect(nombreHtml.innerHTML).toEqual(nombre +" "+apellidos);
      expect(emailHtml.innerHTML).toEqual(email);
      expect(numeroTelefonoHtml.innerHTML).toEqual( "Tlf: "+ numeroTelefono );
     
    })
    it('Click en el produto y envio de ID correcto', () => {
      spyOn(usuarioService, 'getAdministrador').and.returnValue(Promise.resolve(admin));
      usuarioService.getAdministrador();
      
      spyOn(component, 'borrarComprador');
      let button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
      expect(component.borrarComprador).toHaveBeenCalled();
      
      })

});
})