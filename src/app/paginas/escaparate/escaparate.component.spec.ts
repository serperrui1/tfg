import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { EscaparateComponent } from './escaparate.component';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Proveedor } from 'src/app/models/proveedor';
import { Producto } from 'src/app/models/producto';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';


describe('ProveedorTarjeta', () => {
  let usuarioService:UsuarioService
  let component: EscaparateComponent;
  let fixture: ComponentFixture<EscaparateComponent>;
  let proveedorTest: Proveedor;
  let productosProveedor: Producto[];
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscaparateComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
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
      productosProveedor = [{
        titulo: "Producto test1",
        descripcion: "descripcion del producto1",
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
       },
       {
        titulo: "Producto test2",
        descripcion: "descripcion del producto2",
        categoria: "Informática",
        unidadesMinimas: 10,
        stock: 1000,
        imagenes: ["https://firebasestorage.googleapis.com/v0/b/sellersplaza-41a82.appspot.com/o/0.945511812950624671iwsp6jzHL._AC_SL1280_.jpg?alt=media&token=bcdc5e71-c7f7-461d-945b-41eb880443dc"],
        precio: 15,
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
        unidadesVendidas: 5,
        puntuacionMedia: 3,
        productoEstrella: false
       }]
      fixture = TestBed.createComponent(EscaparateComponent);
      component = fixture.componentInstance;
      component.imagenFirebase= true;
      component.proveedor = proveedorTest;
      component.productosProveedor = productosProveedor;
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
      let email = component.proveedor.email;
      let direccion = component.proveedor.direccion;
      let sector = component.proveedor.sector;

      const nombreHtml = fixture.debugElement.nativeElement.querySelector('#nombre');
      const emailHtml = fixture.debugElement.nativeElement.querySelector('#email');
      const direccionHtml = fixture.debugElement.nativeElement.querySelector('#direccion');
      const sectorHtml = fixture.debugElement.nativeElement.querySelector('#sector');


      expect(nombreHtml.innerHTML).toEqual('Tienda del proveedor: ' + nombre);
      expect(sectorHtml.innerHTML).toEqual(sector);
      expect(direccionHtml.innerHTML).toEqual(direccion);
      expect(emailHtml.innerHTML).toEqual(email);
    })


});
})