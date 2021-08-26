import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";

import { Pedido } from 'src/app/models/pedido';
import { ChatTarjetaComponent } from './chat-tarjeta.component';
import { Chat } from 'src/app/models/chat';
import { Comprador } from 'src/app/models/comprador';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';




describe('Chat tarjeta', () => {
  let productoService:ProductoService
  let component: ChatTarjetaComponent;
  let fixture: ComponentFixture<ChatTarjetaComponent>;
  let chatTest: Chat;
  let compradorTest:Comprador;
  let productoTest:Producto;
  let notificacion:boolean = false;
  let flag:boolean = false;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatTarjetaComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]

    })
    .compileComponents();
      chatTest = {
        fechaPublicacion: "2000-11-18",
        fechaPedido: "Thu May 06 2021 16:43:38 GMT+0200 (hora de verano de Europa central)",
        compradorId: "CompradorId",
        proveedorId:"ProveedorId",
        productoId: "productoId",
        proveedorNombre: "Proveedor nombre",
        leido: true,
        ultimoEmisor: "CompradorId",
        mensajes:["nombre comprador: mensaje de prueba"]
       };
       compradorTest = {
        nombre: "nombre comprador",
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
        uid:"CompradorId",
        img:"https://firebasestorage.googleapis.com/v0/b/sellersplaza-41a82.appspot.com/o/0.056040226046601305e48791f1-51ca-4cc3-aa8b-f9d135917dab.jpeg?alt=media&token=3b6f30bd-3d6c-4b71-8a9c-664b12485d10"
      }
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
        _id:"productoId"
       }

      fixture = TestBed.createComponent(ChatTarjetaComponent);
      component = fixture.componentInstance;
      component.data = chatTest;
      component.chat = chatTest;
      component.comp = compradorTest;
      component.producto = productoTest;
      component.notificacion =notificacion;
      component.flag = flag;
      productoService  = TestBed.inject(ProductoService);
      //spyOn(pedidoService, 'actualizarEnvio').and.returnValue(Promise.resolve(pedidoTest));

      fixture.detectChanges();
      
  }),

  describe('Mensaje enviado por mí', () => {
    

    it('Chat leido True y notificacion False', () => {
      expect(component.chat.ultimoEmisor).toEqual(component.comp.uid);
      expect(component.chat.leido).toBeTrue();
      expect(component.notificacion).toBeFalse()
    })
  });
  describe('HTML ChatTarjeta con un proveedor como comprador', () => {
    it('unidades, fecha de compra, fecha esperada y estado: Correctos', () => {
      let proveedorNombre = component.chat.proveedorNombre;
      let productoTitulo = component.producto.titulo;
      let fechaPublicacion = new Date(component.chat.fechaPublicacion);

      const proveedorNombreHtml = fixture.debugElement.nativeElement.querySelector('#proveedorNombre');
      const productoHtml = fixture.debugElement.nativeElement.querySelector('#producto');

      expect(proveedorNombreHtml.innerHTML).toEqual("Chat con el proveedor: "+ proveedorNombre);
      expect(productoHtml.innerHTML).toEqual('Sobre el producto "'+ productoTitulo +'" con último mensaje del '+fechaPublicacion.getDate() + "/"+(fechaPublicacion.getMonth()+1)+ "/" +fechaPublicacion.getFullYear()+". ");

    })
    it('Click en el boton de ver Chat', () => {  
      let boton = fixture.debugElement.nativeElement.querySelector('#verChat');
      spyOn(component, 'verChat');
      boton.click();
      fixture.detectChanges();
      expect(component.verChat).toHaveBeenCalled();
      
    })

  });
  })