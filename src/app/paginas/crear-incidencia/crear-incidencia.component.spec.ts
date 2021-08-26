import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { CrearIncidenciaComponent } from './crear-incidencia.component';

import { of } from 'rxjs';
import { SpamValidator } from 'src/app/Validaciones-Customizadas.directive';
import { Comprador } from 'src/app/models/comprador';
import { ChatService } from 'src/app/services/chat.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SpamService } from 'src/app/services/spam.service';
import { Proveedor } from 'src/app/models/proveedor';

describe('Crear Incidencia', () => {
  let usuarioService:UsuarioService
  let chatService:ChatService
  let productoService:ProductoService
  let spamService:SpamService
  let fb:FormBuilder
  let component: CrearIncidenciaComponent;
  let fixture: ComponentFixture<CrearIncidenciaComponent>;
  let expresionesSpam = ["spam1", "spam2"]
  let token: string = "token";
  let usuario:string = "usuarioId";
  let proveedorId: string = "proveedorId";
  let compradorTest: Comprador;
  let proveedorTest: Proveedor;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearIncidenciaComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ]

    })
    .compileComponents();
    fixture = TestBed.createComponent(CrearIncidenciaComponent);
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
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.token = token;
    component.usuario = "comprador";
    component.expresionesSpam = expresionesSpam;
    component.comp = compradorTest;
    component.compradorNombre = compradorTest.nombre;
    component.proveedorNombre = "Proveedor Nombre";
    component.prov=proveedorTest;

    component.incidenciaForm = fb.group({
      compradorId: [ component.comp.uid ],
      titulo:['', [Validators.required, SpamValidator(component.expresionesSpam)]],
      descripcion:['', [Validators.required, SpamValidator(component.expresionesSpam)]],
      tematica:['Login', [ Validators.required] ]
      });
    usuarioService = TestBed.inject(UsuarioService)
    chatService = TestBed.inject(ChatService)
    productoService = TestBed.inject(ProductoService)
    spamService = TestBed.inject(SpamService)

    fixture.detectChanges();

  });

   describe('Formulario Crear Incidencia', () => {
    it('Formulario: Iniciado correctamente', () => {

      let titulo = component.incidenciaForm.controls['titulo']
      let descripcion = component.incidenciaForm.controls['descripcion']
      let tematica = component.incidenciaForm.controls['tematica']



      expect(titulo.value).toEqual('')
      expect(descripcion.value).toEqual('')
      expect(tematica.value).toEqual('Login')



      expect(component.incidenciaForm.valid).toBeFalsy()


    })

    it('Formulario Válido', () => {

      let titulo = component.incidenciaForm.controls['titulo']
      let descripcion = component.incidenciaForm.controls['descripcion']
      let tematica = component.incidenciaForm.controls['tematica']

      titulo.setValue("Título de la incidencia")
      descripcion.setValue("Descripción de la incidencia")
      tematica.setValue("Login")


      expect(component.incidenciaForm.valid).toBeTruthy();
    })
     it('Formulario NO Válido : Incidencia con Spam', () => {
      let titulo = component.incidenciaForm.controls['titulo']
      let descripcion = component.incidenciaForm.controls['descripcion']
      let tematica = component.incidenciaForm.controls['tematica']

      titulo.setValue("Título de la incidencia con spam1")
      descripcion.setValue("Descripción de la incidencia")
      tematica.setValue("Login")


      expect(component.incidenciaForm.valid).toBeFalsy();

   })
  })
  describe('Elementos HTML ', () => {
  it('Botón para enviar la incidencia', () => {
    let titulo = component.incidenciaForm.controls['titulo']
    let descripcion = component.incidenciaForm.controls['descripcion']
    let tematica = component.incidenciaForm.controls['tematica']

    titulo.setValue("Título de la incidencia")
    descripcion.setValue("Descripción de la incidencia")
    tematica.setValue("Login")


    spyOn(component, 'crearIncidencia')
    const button = fixture.debugElement.nativeElement.querySelector('#submit');
    button.click();
    expect(component.crearIncidencia).toHaveBeenCalled()
  })
 })

});