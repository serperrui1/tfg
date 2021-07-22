import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { PedidoTarjetaComponent } from './pedido-tarjeta.component';
import { ProductoService } from 'src/app/services/producto.service';

import { Router } from '@angular/router';

import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';


describe('PedidoTarjeta', () => {
  let productoService:ProductoService
  let component: PedidoTarjetaComponent;
  let fixture: ComponentFixture<PedidoTarjetaComponent>;
  let pedidoTest: Pedido;
  let productoTest: Producto;
  let productoId: string = "idproductoTest";
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoTarjetaComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'producto/:productoId', component: PedidoTarjetaComponent }
         ]),
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
      pedidoTest = {
        direccionEnvio: "Dirección de envío",
        codigoPostal: 41940,
        nombreComprador: "Nombre del comprador",
        nombreProveedor:"Nombre del proveedor",
        fechaCompra: new Date("2020-11-18T17:47:56.562+00:00"),
        producto: "idproductoTest",
        tituloProducto: "Producto Test",
        categoria: "Informática",
        unidades:8,
        precio: 80,
        numeroTelefono:666332211,
        proveedor: "idproveedorTest",
        comprador: "idcompradorTest",
        fechaEsperada: "una semana",
        estadoEnvio: "Entregado"
       };
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
        productoEstrella: false,
        _id:"idproductoTest"
           };

      productoId = pedidoTest.producto;
      fixture = TestBed.createComponent(PedidoTarjetaComponent);
      component = fixture.componentInstance;
      component.pedido = pedidoTest;
      component.producto = productoTest;
      productoService = TestBed.inject(ProductoService);
      spyOn(productoService, 'getProductoPorID').and.returnValue(Promise.resolve(productoTest));

      fixture.detectChanges();
      
  }),

  describe('Comprobar imagen Firebase', () => {
   
    it('Imagen de firebase: True', () => {
      
      expect(component.imagenFirebase).toBeTrue()
    })

  
    it('Imagen de firebase: False', () => {
      fixture.detectChanges();
      productoTest.imagenes = ["noesFirebase"];

      fixture.whenStable();

      expect(component.producto.imagenes[0]).toEqual('noesFirebase')
    })


  })

  describe('HTML pedido tarjeta', () => {
    it('Título, proveedor, unidades, fecha de compra y percio: Correctos', () => {
      let titulo = component.pedido.tituloProducto;
      let nombreProveedor = component.pedido.nombreProveedor;
      let unidades = component.pedido.unidades;
      let fechaCompra = component.pedido.fechaCompra;
      let precio = component.pedido.precio;

      const tituloHtml = fixture.debugElement.nativeElement.querySelector('#titulo');
      const proveedorHtml = fixture.debugElement.nativeElement.querySelector('#proveedor');
      const comprahtml = fixture.debugElement.nativeElement.querySelector('#compra');


      expect(tituloHtml.innerHTML).toEqual(titulo);
      expect(proveedorHtml.innerHTML).toEqual("Proveedor: "+ nombreProveedor);
      expect(comprahtml.innerHTML).toEqual("Compra de "+unidades + " unidades realizada el "+ fechaCompra.getDate() + "/"+ (fechaCompra.getMonth()+1)+ "/" +fechaCompra.getFullYear() + " por un total de "+precio+" €.");
    })
    it('Click en Seguimiento del pedido: Correcto', () => {  
      const envio = fixture.debugElement.nativeElement.querySelector('#seguimiento');
      spyOn(component, 'openDialog');
      envio.click();
      fixture.detectChanges();
      expect(component.openDialog).toHaveBeenCalled();
    })

});
})