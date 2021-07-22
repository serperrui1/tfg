import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";

import { PedidosService } from 'src/app/services/pedidos.service';

import { Pedido } from 'src/app/models/pedido';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadoEnvioComponent } from './estado-envio.component';



describe('Estado Envio', () => {
  let pedidoService:PedidosService
  let component: EstadoEnvioComponent;
  let fixture: ComponentFixture<EstadoEnvioComponent>;
  let pedidoTest: Pedido;;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoEnvioComponent ],
      imports: [
        MatDialogModule,
        HttpClientTestingModule
      ],
      providers:[
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }, 
         
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
        estadoEnvio: "Enviado"
       };

      fixture = TestBed.createComponent(EstadoEnvioComponent);
      component = fixture.componentInstance;
      component.data = pedidoTest;
      pedidoService = TestBed.inject(PedidosService);
      spyOn(pedidoService, 'actualizarEnvio').and.returnValue(Promise.resolve(pedidoTest));

      fixture.detectChanges();
      
  }),

  describe('HTML Datos de envío', () => {
    it('unidades, fecha de compra, fecha esperada y estado: Correctos', () => {
      let unidades= component.data.unidades.toString();
      let fechaCompra = component.data.fechaCompra;
      let fechaEsperada = component.data.fechaEsperada;
      let estado = component.data.estadoEnvio;

      const unidadesHtml = fixture.debugElement.nativeElement.querySelector('#unidades');
      const fechaCompraHtml = fixture.debugElement.nativeElement.querySelector('#fechaCompra');
      const fechaEsperadaHtml = fixture.debugElement.nativeElement.querySelector('#fechaEsperada');
      const estadoHtml = fixture.debugElement.nativeElement.querySelector('#estado');


      expect(unidadesHtml.innerHTML).toEqual(unidades);
      expect(fechaCompraHtml.innerHTML).toEqual(" "+fechaCompra.getDate() + "/"+(fechaCompra.getMonth()+1)+ "/" +fechaCompra.getFullYear()+" ");
      expect(fechaEsperadaHtml.innerHTML).toEqual(fechaEsperada);
      expect(estadoHtml.innerHTML).toEqual(estado);
    })
    it('Click en marcar como enviado: Correcto', () => {  
      const boton = fixture.debugElement.nativeElement.querySelector('#botonEnviar');
      spyOn(component, 'marcarRecibido');
      boton.click();
      fixture.detectChanges();
      expect(component.marcarRecibido).toHaveBeenCalled();
      
    })
});
})