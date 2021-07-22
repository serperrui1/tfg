import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { CrearChatComponent } from './crear-chat.component';

import { of } from 'rxjs';
import { SpamValidator } from 'src/app/Validaciones-Customizadas.directive';
import { Comprador } from 'src/app/models/comprador';
import { ChatService } from 'src/app/services/chat.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SpamService } from 'src/app/services/spam.service';

describe('Crear Chat', () => {
  let usuarioService:UsuarioService
  let chatService:ChatService
  let productoService:ProductoService
  let spamService:SpamService
  let fb:FormBuilder
  let component: CrearChatComponent;
  let fixture: ComponentFixture<CrearChatComponent>;
  let expresionesSpam = ["spam1", "spam2"]
  let token: string = "token";
  let usuario:string = "usuarioId";
  let proveedorId: string = "proveedorId";
  let compradorTest: Comprador;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearChatComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ]

    })
    .compileComponents();
    fixture = TestBed.createComponent(CrearChatComponent);
    window['gapi'] = {
      load() {
        return null;
      },
      anotherFunction() {
        return null;
      },

    }
    compradorTest = {
      nombre: "Comprador Nombre",
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
      img:"https://firebasestorage.googleapis.com/v0/b/sellersplaza-41a82.appspot.com/o/0.056040226046601305e48791f1-51ca-4cc3-aa8b-f9d135917dab.jpeg?alt=media&token=3b6f30bd-3d6c-4b71-8a9c-664b12485d10",
      uid:"compradorId"
    }
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.token = token;
    component.usuario = "comprador";
    component.expresionesSpam = expresionesSpam;
    component.proveedorId = proveedorId;
    component.comp = compradorTest;
    component.compradorNombre = compradorTest.nombre;
    component.proveedorNombre = "Proveedor Nombre";
    component.autor = component.comp.nombre.trim() + " " + component.comp.apellidos + ": ";
    component.productoId = "productoId";
    component.producto  = {
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
        comprador: "compradorId"
      }
       ],
      proveedorNombre: "Proveedor Nombre",
      proveedor: "proveedorId",
      tiempoEnvio: "Una semana",
      datosTecnicos: [],
      posicion: {
       lat:30,
       lng:20
       },
      unidadesVendidas: 15,
      puntuacionMedia: 4,
      productoEstrella: false
     };

    component.chatForm = fb.group({
      compradorId: [ component.comp.uid ],
        proveedorId: [ component.proveedorId ],
        productoId: [  component.productoId ],
        proveedorNombre: [ component.proveedorNombre ],
        mensajes: ['', [Validators.required, SpamValidator(component.expresionesSpam)]],
        fechaPublicacion: [ '12/12/2020' ]
      });
    usuarioService = TestBed.inject(UsuarioService)
    chatService = TestBed.inject(ChatService)
    productoService = TestBed.inject(ProductoService)
    spamService = TestBed.inject(SpamService)

    fixture.detectChanges();

  });

   describe('Formulario Crear Chat', () => {
    it('Formulario: Iniciado correctamente', () => {

      let compradorId = component.chatForm.controls['compradorId']
      let proveedorId = component.chatForm.controls['proveedorId']
      let productoId = component.chatForm.controls['productoId']
      let proveedorNombre = component.chatForm.controls['proveedorNombre']
      let mensajes = component.chatForm.controls['mensajes']
      let fechaPublicacion = component.chatForm.controls['fechaPublicacion']


      expect(compradorId.value).toEqual('compradorId')
      expect(proveedorId.value).toEqual('proveedorId')
      expect(productoId.value).toEqual('productoId')
      expect(proveedorNombre.value).toEqual('Proveedor Nombre')
      expect(mensajes.value).toEqual("")


      expect(component.chatForm.valid).toBeFalsy()


    })

    it('Formulario Válido', () => {

      let compradorId = component.chatForm.controls['compradorId']
      let proveedorId = component.chatForm.controls['proveedorId']
      let productoId = component.chatForm.controls['productoId']
      let proveedorNombre = component.chatForm.controls['proveedorNombre']
      let mensajes = component.chatForm.controls['mensajes']
      let fechaPublicacion = component.chatForm.controls['fechaPublicacion']

      compradorId.setValue(component.comp.uid)
      proveedorId.setValue(component.proveedorId)
      productoId.setValue(component.productoId)
      proveedorNombre.setValue(component.proveedorNombre)
      mensajes.setValue('Mensaje de prueba')
      fechaPublicacion.setValue('16/07/2021')

      expect(component.chatForm.valid).toBeTruthy();
    })
     it('Formulario NO Válido : Mensaje con Spam', () => {

      let compradorId = component.chatForm.controls['compradorId']
      let proveedorId = component.chatForm.controls['proveedorId']
      let productoId = component.chatForm.controls['productoId']
      let proveedorNombre = component.chatForm.controls['proveedorNombre']
      let mensajes = component.chatForm.controls['mensajes']
      let fechaPublicacion = component.chatForm.controls['fechaPublicacion']

      compradorId.setValue(component.comp.uid)
      proveedorId.setValue(component.proveedorId)
      productoId.setValue(component.productoId)
      proveedorNombre.setValue(component.proveedorNombre)
      mensajes.setValue('spam1')
      fechaPublicacion.setValue('16/07/2021')

      expect(component.chatForm.valid).toBeFalsy();

   })
  })
  describe('Elementos HTML ', () => {
  it('Botón para enviar el mensaje', () => {
    let compradorId = component.chatForm.controls['compradorId']
      let proveedorId = component.chatForm.controls['proveedorId']
      let productoId = component.chatForm.controls['productoId']
      let proveedorNombre = component.chatForm.controls['proveedorNombre']
      let mensajes = component.chatForm.controls['mensajes']
      let fechaPublicacion = component.chatForm.controls['fechaPublicacion']

      compradorId.setValue(component.comp.uid)
      proveedorId.setValue(component.proveedorId)
      productoId.setValue(component.productoId)
      proveedorNombre.setValue(component.proveedorNombre)
      mensajes.setValue('Mensaje de prueba')
      fechaPublicacion.setValue('16/07/2021')


    spyOn(component, 'crearChat')
    const button = fixture.debugElement.nativeElement.querySelector('#publicar');
    button.click();
    expect(component.crearChat).toHaveBeenCalled()
  })
})

});