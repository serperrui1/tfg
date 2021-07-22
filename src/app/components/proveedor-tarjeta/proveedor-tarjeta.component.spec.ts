import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ProveedorTarjetaComponent } from './proveedor-tarjeta.component';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Proveedor } from 'src/app/models/proveedor';


describe('ProveedorTarjeta', () => {
  let usuarioService:UsuarioService
  let component: ProveedorTarjetaComponent;
  let fixture: ComponentFixture<ProveedorTarjetaComponent>;
  let proveedorTest: Proveedor;
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorTarjetaComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
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
      fixture = TestBed.createComponent(ProveedorTarjetaComponent);
      component = fixture.componentInstance;
      component.proveedor = proveedorTest;
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
      proveedorTest.img = "noesFirebase";

      fixture.whenStable();

      expect(component.proveedor.img).toEqual('noesFirebase')
    })


  })

  describe('HTML producto tarjeta', () => {
   
    it('Título, precio y unidades vendidas correctos', () => {
      let nombre = component.proveedor.nombreEmpresa;
      let sector = component.proveedor.sector;
      let unidadesVendidas = component.proveedor.unidadesVendidas;
      let puntuacionMedia = component.proveedor.puntuacionMedia;

      const nombreHtml = fixture.debugElement.nativeElement.querySelector('#nombreEmpresa');
      const sectorHtml = fixture.debugElement.nativeElement.querySelector('#sector');
      const unidadesVendidasHtml = fixture.debugElement.nativeElement.querySelector('#udVendidas');
      const puntuacionMediaHtml = fixture.debugElement.nativeElement.querySelector('#puntuacionMedia');


      expect(nombreHtml.innerHTML).toEqual(nombre);
      expect(sectorHtml.innerHTML).toEqual(sector);
      expect(unidadesVendidasHtml.innerHTML).toEqual( "Ventas: "+ unidadesVendidas );
      expect(puntuacionMediaHtml.innerHTML).toEqual("("+puntuacionMedia+")");
    })
    it('Click en el produto y envio de ID correcto', () => {
      const proveedor = fixture.debugElement.nativeElement.querySelector('#proveedor');
      spyOn(component.proveedorSeleccionado, 'emit');
      proveedor.click();
      fixture.detectChanges();
      expect(component.proveedorSeleccionado.emit).toHaveBeenCalledWith(component.proveedor.uid);
  })

});
})