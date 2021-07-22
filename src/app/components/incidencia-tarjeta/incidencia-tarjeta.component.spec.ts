import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";

import { IncidenciaTarjetaComponent } from './incidencia-tarjeta.component';
import { Comprador } from 'src/app/models/comprador';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Incidencia } from 'src/app/models/incidencia';
import { AsistenteTecnico } from 'src/app/models/asistente';




describe('Incidencia Tarjeta', () => {
  let productoService:ProductoService
  let component: IncidenciaTarjetaComponent;
  let fixture: ComponentFixture<IncidenciaTarjetaComponent>;
  let incidenciaTest: Incidencia;
  let compradorTest:Comprador;
  let asistenteTest:AsistenteTecnico;
  let notificacion:boolean = false;
  let apellidosComprador = "Apellidos del comprador"

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidenciaTarjetaComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]

    })
    .compileComponents();
    asistenteTest = {
      nombre: "Asistente test",
      apellidos: "Romero",
      email: "asistente@test.com",
      password: "123456789",
      img:"https://imagen.jpg",
      uid:"asistenteId"
    }
    incidenciaTest = {
        fechaPublicacion: "2000-11-18",
        titulo: "incidencia título",
        descripcion: "incidencia descripción",
        tematica:"temática de la incidencia",
        creadorId: "compradorId",
        asignado: true,
        resuelto: false,
        asistenteId:"asistenteId",
        leida:false,
        ultimoEmisor: "compradorId",
        mensajes:["nombre comprador: mensaje de incidencia"]
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
      

      fixture = TestBed.createComponent(IncidenciaTarjetaComponent);
      component = fixture.componentInstance;
      component.data = incidenciaTest;
      component.comp = compradorTest;
      component.nombreComprador = compradorTest.nombre;
      component.aT = asistenteTest;
      component.incidencia = incidenciaTest;
      component.notificacion =notificacion;
      component.apellidosComprador = apellidosComprador;
      productoService  = TestBed.inject(ProductoService);
      //spyOn(pedidoService, 'actualizarEnvio').and.returnValue(Promise.resolve(pedidoTest));

      fixture.detectChanges();
      
  }),

  describe('Mensaje enviado por mí', () => {
    

    it('Incidencia asignada , no resuelta y no leida False', () => {
      expect(component.incidencia.ultimoEmisor).not.toEqual(component.aT.uid);
      expect(component.incidencia.leida).toBeFalse();
      expect(component.incidencia.asignado).toBeTrue();
      expect(component.incidencia.asistenteId).toEqual(component.aT.uid);

    })
  });
  describe('HTML Incidencia Tarjeta con un comprador como asistente técnico', () => {
    it('nombreComprador, titulo, tematica y fechaPublicacion: Correctos', () => {
      let nombreComprador = component.nombreComprador;
      let apellidosComprador = component.apellidosComprador;
      let titulo = component.incidencia.titulo;
      let tematica = component.incidencia.tematica;
      let fechaPublicacion = new Date(component.incidencia.fechaPublicacion);

      const nombreCompradorHtml = fixture.debugElement.nativeElement.querySelector('#compradorIncidencia');
      const tituloHtml = fixture.debugElement.nativeElement.querySelector('#titulo');
      const tematicaHtml = fixture.debugElement.nativeElement.querySelector('#tematica');
      const fechaHtml = fixture.debugElement.nativeElement.querySelector('#fecha');

      expect(nombreCompradorHtml.innerHTML).toEqual("Incidencia del comprador: "+ nombreComprador + " " +apellidosComprador);
      expect(tituloHtml.innerHTML).toEqual('Título: "'+titulo+'"');
      expect(tematicaHtml.innerHTML).toEqual('Temática: '+tematica);
      expect(fechaHtml.innerHTML).toEqual('Último mensaje enviado el '+fechaPublicacion.getDate() + "/"+(fechaPublicacion.getMonth()+1)+ "/" +fechaPublicacion.getFullYear()+".");

    })
    it('Click en el boton de ver Incidencia', () => {  
      let boton = fixture.debugElement.nativeElement.querySelector('#verIncidencia');
      spyOn(component, 'verIncidencia');
      boton.click();
      fixture.detectChanges();
      expect(component.verIncidencia).toHaveBeenCalled();
      
    })

  });
  })