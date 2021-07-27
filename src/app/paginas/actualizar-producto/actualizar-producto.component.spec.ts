import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { ActualizarProductoComponent } from './actualizar-producto.component';

import { of } from 'rxjs';
import { SpamValidator } from 'src/app/Validaciones-Customizadas.directive';
import { ChatService } from 'src/app/services/chat.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SpamService } from 'src/app/services/spam.service';
import { Proveedor } from 'src/app/models/proveedor';
import { CargaImagenenesService } from 'src/app/services/carga-imagenenes.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';

describe('Crear Producto', () => {
  let usuarioService:UsuarioService
  let productoService:ProductoService
  let spamService:SpamService
  let cargaImagenService:CargaImagenenesService
  let fb:FormBuilder
  let component: ActualizarProductoComponent;
  let fixture: ComponentFixture<ActualizarProductoComponent>;
  let expresionesSpam = ["spam1", "spam2"]
  let token: string = "token";
  let proveedorTest: Proveedor;
  let categoria: string = 'Libros, Música, Vídeo y DVD';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarProductoComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        AngularFireModule
      ],
      providers:[
        {
          provide: AngularFireStorage,
          useValue: {}
        }
      ]

    })
    .compileComponents();
    fixture = TestBed.createComponent(ActualizarProductoComponent);
    window['gapi'] = {
      load() {
        return null;
      },
      anotherFunction() {
        return null;
      },

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
    component.usuario = "proveedor";
    component.expresionesSpam = expresionesSpam;
    component.prov = proveedorTest;
    component.categoria= categoria;
    component.producto  = {
      titulo: "Producto test",
      descripcion: "descripcion del producto",
      categoria: "Informática",
      subcategoria:"",
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

    component.productoForm = fb.group({
      titulo:['', [Validators.required , SpamValidator(component.expresionesSpam)]],
      descripcion:['', [Validators.required , SpamValidator(component.expresionesSpam)]],
      categoria:['Libros, Música, Vídeo y DVD',],
      unidadesMinimas:['', [Validators.required, component.unidadesMinimasIncorrecto]],
      stock:['', [Validators.required, component.stockIncorrecto]],
      precio:['', [Validators.required, component.precioIncorrecto]],
      tiempoEnvio:['', [Validators.required]],
      subcategoria:['', ],
      datosTecnicos: fb.array([fb.group({
        datosTecnicosTitulo:[''],
        datosTecnicosDescripcion:['']
    })]),
    });
    usuarioService = TestBed.inject(UsuarioService)
    cargaImagenService = TestBed.inject(CargaImagenenesService)
    productoService = TestBed.inject(ProductoService)
    spamService = TestBed.inject(SpamService)

    fixture.detectChanges();

  });

   describe('Formulario Crear Producto', () => {

    it('Formulario Válido', () => {

      let titulo = component.productoForm.controls['titulo']
      let descripcion = component.productoForm.controls['descripcion']
      let categoria = component.productoForm.controls['categoria']
      let unidadesMinimas = component.productoForm.controls['unidadesMinimas']
      let stock = component.productoForm.controls['stock']
      let precio = component.productoForm.controls['precio']
      let tiempoEnvio = component.productoForm.controls['tiempoEnvio']
      let subcategoria = component.productoForm.controls['subcategoria']

      titulo.setValue("Producto de prueba")
      descripcion.setValue("Descripción del producto de prueba")
      categoria.setValue("Libros, Música, Vídeo y DVD")
      unidadesMinimas.setValue(40)
      stock.setValue(200)
      precio.setValue(10)
      tiempoEnvio.setValue('Una semana')
      subcategoria.setValue('Libros')

      expect(titulo.value).toEqual('Producto de prueba')
      expect(descripcion.value).toEqual('Descripción del producto de prueba')
      expect(categoria.value).toEqual('Libros, Música, Vídeo y DVD')
      expect(unidadesMinimas.value).toEqual(40)
      expect(stock.value).toEqual(200)
      expect(precio.value).toEqual(10)
      expect(tiempoEnvio.value).toEqual("Una semana")
      expect(subcategoria.value).toEqual("Libros")

    })
     it('Formulario NO Válido : Producto con Spam', () => {

      let titulo = component.productoForm.controls['titulo']
      let descripcion = component.productoForm.controls['descripcion']
      let categoria = component.productoForm.controls['categoria']
      let unidadesMinimas = component.productoForm.controls['unidadesMinimas']
      let stock = component.productoForm.controls['stock']
      let precio = component.productoForm.controls['precio']
      let tiempoEnvio = component.productoForm.controls['tiempoEnvio']
      let subcategoria = component.productoForm.controls['subcategoria']

      titulo.setValue("Producto de prueba con spam1")
      descripcion.setValue("Descripción del producto de prueba")
      categoria.setValue("Libros, Música, Vídeo y DVD")
      unidadesMinimas.setValue(40)
      stock.setValue(200)
      precio.setValue(10)
      tiempoEnvio.setValue('Una semana')
      subcategoria.setValue('Libros')

      expect(component.productoForm.valid).toBeFalsy()
   })
  })
  describe('Elementos HTML ', () => {
  it('Botón para crear el Producto', () => {
    let titulo = component.productoForm.controls['titulo']
    let descripcion = component.productoForm.controls['descripcion']
    let categoria = component.productoForm.controls['categoria']
    let unidadesMinimas = component.productoForm.controls['unidadesMinimas']
    let stock = component.productoForm.controls['stock']
    let precio = component.productoForm.controls['precio']
    let tiempoEnvio = component.productoForm.controls['tiempoEnvio']
    let subcategoria = component.productoForm.controls['subcategoria']

    titulo.setValue("Producto de prueba con spam1")
    descripcion.setValue("Descripción del producto de prueba")
    categoria.setValue("Libros, Música, Vídeo y DVD")
    unidadesMinimas.setValue(40)
    stock.setValue(200)
    precio.setValue(10)
    tiempoEnvio.setValue('Una semana')
    subcategoria.setValue('Libros')


    spyOn(component, 'actualizarProducto')
    const button = fixture.debugElement.nativeElement.querySelector('#submit');
    button.click();
    expect(component.actualizarProducto).toHaveBeenCalled()
  })
  it('Botón para borrar el Producto', () => {

    spyOn(component, 'borrarProducto')
    const button = fixture.debugElement.nativeElement.querySelector('#borrarProducto');
    button.click();
    expect(component.borrarProducto).toHaveBeenCalled()
  })
})

});