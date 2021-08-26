import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { ProductoComponent } from './producto.component';

import { of } from 'rxjs';
import { SpamValidator } from 'src/app/Validaciones-Customizadas.directive';
import { Comprador } from 'src/app/models/comprador';
import { ChatService } from 'src/app/services/chat.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SpamService } from 'src/app/services/spam.service';
import { Proveedor } from 'src/app/models/proveedor';
import { Producto } from 'src/app/models/producto';
import { Pedido } from 'src/app/models/pedido';

describe('Producto Component', () => {
  let usuarioService:UsuarioService
  let productoService:ProductoService
  let spamService:SpamService
  let fb:FormBuilder
  let component: ProductoComponent;
  let fixture: ComponentFixture<ProductoComponent>;
  let expresionesSpam = ["spam1", "spam2"]
  let token: string = "token";
  let usuario:string = "usuarioId";
  let proveedorId: string = "proveedorId";
  let compradorTest: Comprador;
  let proveedorTest: Proveedor;
  let productoId = "productoId";
  let misPedidosTest:Pedido[];
  let yaValorado = false;
  let flag = true;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ]

    })
    .compileComponents();
    fixture = TestBed.createComponent(ProductoComponent);
    window['gapi'] = {
      load() {
        return null;
      },
      anotherFunction() {
        return null;
      },

    }
    misPedidosTest = [{
      direccionEnvio: "Direccion",
        codigoPostal: 41414,
        nombreComprador: "Comprador1",
        fechaCompra: new Date("2020-11-18"),
        producto: "productoId",
        tituloProducto: "título",
        categoria: "Relojes",
        unidades: 100,
        precio: 1,
        numeroTelefono:654654654,
        proveedor: "proveedorId",
        comprador: "compradorId",
        fechaEsperada: "2 Semans",
        estadoEnvio:"Entregado",
    }]
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
    component.yaValorado = yaValorado;
    component.flag = flag;
    component.prov=null;
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
     component.productoForm = new FormGroup({
      cantidadProducto: new FormControl(component.producto.unidadesMinimas)
    });

    component.valoracionForm = fb.group({
        comentario:[ "",[Validators.required , SpamValidator(component.expresionesSpam)]],
        puntuacion: ["0" , [Validators.required]]
      });
    usuarioService = TestBed.inject(UsuarioService)
    productoService = TestBed.inject(ProductoService)
    spamService = TestBed.inject(SpamService)

    fixture.detectChanges();

  });

   describe('Formulario Crear Valoración', () => {
    it('Formulario: Iniciado correctamente', () => {

      let comentario = component.valoracionForm.controls['comentario']
      let puntuacion = component.valoracionForm.controls['puntuacion']

      expect(comentario.value).toEqual('')
      expect(puntuacion.value).toEqual('0')

     expect(component.valoracionForm.valid).toBeFalsy()


    })

    it('Formulario Válido', () => {

      let comentario = component.valoracionForm.controls['comentario']
      let puntuacion = component.valoracionForm.controls['puntuacion']

      comentario.setValue("valoración del producto")
      puntuacion.setValue("3")
    
      expect(component.valoracionForm.valid).toBeTruthy();
    })
     it('Formulario NO Válido : Valoración con Spam', () => {
      let comentario = component.valoracionForm.controls['comentario']
      let puntuacion = component.valoracionForm.controls['puntuacion']

      comentario.setValue("spam1")
      puntuacion.setValue(3)

      expect(component.valoracionForm.valid).toBeFalsy();

   })
  })
  describe('Elementos HTML ', () => {
  it('Botón para enviar la valoracion', () => {
    let comentario = component.valoracionForm.controls['comentario']
    let puntuacion = component.valoracionForm.controls['puntuacion']


    comentario.setValue("valoración del producto")
    puntuacion.setValue("3")

    spyOn(component, 'publicarValoracion')
    expect(component.valoracionForm.valid).toBeTrue();
    expect(component.flag).toBeTrue();
    expect(component.yaValorado).toBeFalse();
    const button = fixture.debugElement.nativeElement.querySelector('#valorar');
    button.click();
  })
  it('Botón para borrar la valoracion', async () => {
    component.yaValorado = true;

    spyOn(component, 'borrarValoracion')
    expect(component.yaValorado).toBeTrue();
    expect(component.producto).toBeTruthy();
    expect(component.productoForm).toBeTruthy();
    fixture.whenStable().then(() => {
    const button = fixture.debugElement.nativeElement.querySelector('borrar');
    button.click()
    expect(component.borrarValoracion).toHaveBeenCalled()
  });
  })
 })

});