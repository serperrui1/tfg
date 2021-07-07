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

  
    // it('Imagen de firebase: False', () => {
    //   fixture.detectChanges();
    //   productoTest.imagenes = ["noesFirebase"];

    //   fixture.whenStable();

    //   expect(component.producto.imagenes[0]).toEqual('noesFirebase')
    //   // expect(component.imagenFirebase).toBeFalse()
    //   // expect(component.noImagen).toBeFalse()
    // })


  })

  describe('HTML producto tarjeta', () => {
   
  //   it('Título, precio y unidades vendidas correctos', () => {
  //     let titulo = component.producto.titulo;
  //     let precio = component.producto.precio;
  //     let unidadesVendidas = component.producto.unidadesVendidas;

  //     const tituloHtml = fixture.debugElement.nativeElement.querySelector('#titulo');
  //     const precioHtml = fixture.debugElement.nativeElement.querySelector('#precio');
  //     const unidadesVendidasHtml = fixture.debugElement.nativeElement.querySelector('#unidadesVendidas');


  //     expect(tituloHtml.innerHTML).toEqual(titulo);
  //     expect(precioHtml.innerHTML).toEqual(precio+" €");
  //     expect(unidadesVendidasHtml.innerHTML).toEqual("("+ unidadesVendidas + " Ud.vendidas)");
  //   })
  //   it('Click en el produto y envio de ID correcto', () => {
  //     const producto = fixture.debugElement.nativeElement.querySelector('#producto');
  //     spyOn(component.productoSeleccionado, 'emit');
  //     producto.click();
  //     fixture.detectChanges();
  //     expect(component.productoSeleccionado.emit).toHaveBeenCalledWith(component.producto._id);
  // })

});
})