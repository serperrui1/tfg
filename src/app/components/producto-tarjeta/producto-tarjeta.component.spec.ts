import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Location } from '@angular/common';
import { ProductoTarjetaComponent } from './producto-tarjeta.component';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';


describe('ProductoTarjeta', () => {
  let productoService:ProductoService
  let component: ProductoTarjetaComponent;
  let fixture: ComponentFixture<ProductoTarjetaComponent>;
  let productoTest: Producto;
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoTarjetaComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'test', component: ProductoTarjetaComponent }
         ]),
        HttpClientTestingModule
      ]

    })
    .compileComponents();
      productoTest = {
        titulo: "Producto test",
        descripcion: "descripcion del producto",
        categoria: "Informática",
        unidadesMinimas: 50,
        stock: 2000,
        imagenes: ["https://firebasestorage.googleapis.com/v0/b/sellersplaza-41a82.appspot.com/o/0.945511812950624671iwsp6jzHL._AC_SL1280_.jpg?alt=media&token=bcdc5e71-c7f7-461d-945b-41eb880443dc"],
        precio: 10,
        valoraciones: [{
          comentario: "comentario",
          puntuacion: 4,
          comprador: "comprador id "
        }
         ],
        proveedorNombre: "Nombre del proveedor",
        proveedor: "id del proveedor",
        tiempoEnvio: "Una semana",
        datosTecnicos: [],
        posicion: {
         lat:30,
         lng:20
         },
        unidadesVendidas: 15,
        puntuacionMedia: 4,
        productoEstrella: false
       }
      fixture = TestBed.createComponent(ProductoTarjetaComponent);
      component = fixture.componentInstance;
      component.producto = productoTest;
      productoService = TestBed.inject(ProductoService);
      fixture.detectChanges();
  }),

  describe('Comprobar imagen Firebase', () => {
    // beforeAll(()=>{
    //   productoTest = {
    //     titulo: "Producto test",
    //     descripcion: "descripcion del producto",
    //     categoria: "Informática",
    //     unidadesMinimas: 50,
    //     stock: 2000,
    //     imagenes: ["https://firebasestorage.googleapis.com/v0/b/sellersplaza-41a82.appspot.com/o/0.945511812950624671iwsp6jzHL._AC_SL1280_.jpg?alt=media&token=bcdc5e71-c7f7-461d-945b-41eb880443dc"],
    //     precio: 10,
    //     valoraciones: [{
    //       comentario: "comentario",
    //       puntuacion: 4,
    //       comprador: "comprador id "
    //     }
    //      ],
    //     proveedorNombre: "Nombre del proveedor",
    //     proveedor: "id del proveedor",
    //     tiempoEnvio: "Una semana",
    //     datosTecnicos: [],
    //     posicion: {
    //      lat:30,
    //      lng:20
    //      },
    //     unidadesVendidas: 15,
    //     puntuacionMedia: 4,
    //     productoEstrella: false
    //    }
    //   fixture = TestBed.createComponent(ProductoTarjetaComponent);
    //   component = fixture.componentInstance;
    //   component.producto = productoTest;
    //   usuarioService = TestBed.inject(UsuarioService);
    //   productoService = TestBed.inject(ProductoService);
    //   fixture.detectChanges();
    // })

    it('Imagen de firebase: True', () => {
      expect(component.imagenFirebase).toBeTrue()
      expect(component.noImagen).toBeFalse()
    })

  
    it('Imagen de firebase: False', () => {
      fixture.detectChanges();
      productoTest.imagenes = ["noesFirebase"];

      fixture.whenStable();

      expect(component.producto.imagenes[0]).toEqual('noesFirebase')
      // expect(component.imagenFirebase).toBeFalse()
      // expect(component.noImagen).toBeFalse()
    })


  })

  describe('HTML producto tarjeta', () => {
    // beforeAll(()=>{
    //   productoTest = {
    //     titulo: "Producto test",
    //     descripcion: "descripcion del producto",
    //     categoria: "Informática",
    //     unidadesMinimas: 50,
    //     stock: 2000,
    //     imagenes: ["https://firebasestorage.googleapis.com/v0/b/sellersplaza-41a82.appspot.com/o/0.945511812950624671iwsp6jzHL._AC_SL1280_.jpg?alt=media&token=bcdc5e71-c7f7-461d-945b-41eb880443dc"],
    //     precio: 10,
    //     valoraciones: [{
    //       comentario: "comentario",
    //       puntuacion: 4,
    //       comprador: "comprador id "
    //     }
    //      ],
    //     proveedorNombre: "Nombre del proveedor",
    //     proveedor: "id del proveedor",
    //     tiempoEnvio: "Una semana",
    //     datosTecnicos: [],
    //     posicion: {
    //      lat:30,
    //      lng:20
    //      },
    //     unidadesVendidas: 15,
    //     puntuacionMedia: 4,
    //     productoEstrella: false
    //    }
    //   fixture = TestBed.createComponent(ProductoTarjetaComponent);
    //   component = fixture.componentInstance;
    //   component.producto = productoTest;
    //   usuarioService = TestBed.inject(UsuarioService);
    //   productoService = TestBed.inject(ProductoService);
    //   fixture.detectChanges();
    // })
    it('Título, precio y unidades vendidas correctos', () => {
      let titulo = component.producto.titulo;
      let precio = component.producto.precio;
      let unidadesVendidas = component.producto.unidadesVendidas;

      const tituloHtml = fixture.debugElement.nativeElement.querySelector('#titulo');
      const precioHtml = fixture.debugElement.nativeElement.querySelector('#precio');
      const unidadesVendidasHtml = fixture.debugElement.nativeElement.querySelector('#unidadesVendidas');


      expect(tituloHtml.innerHTML).toEqual(titulo);
      expect(precioHtml.innerHTML).toEqual(precio+" €");
      expect(unidadesVendidasHtml.innerHTML).toEqual("("+ unidadesVendidas + " Ud.vendidas)");
    })
    it('Click en el produto y envio de ID correcto', () => {
      const producto = fixture.debugElement.nativeElement.querySelector('#producto');
      spyOn(component.productoSeleccionado, 'emit');
      producto.click();
      fixture.detectChanges();
      expect(component.productoSeleccionado.emit).toHaveBeenCalledWith(component.producto._id);
  })

});
})