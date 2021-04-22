import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Proveedor } from 'src/app/models/proveedor';
import { ProductoService } from 'src/app/services/producto.service';
import { SubirImagenService } from 'src/app/services/subir-imagen.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment'
import { UsuarioService } from 'src/app/services/usuario.service';
import { Producto } from 'src/app/models/producto';
const base_url = environment.base_url;

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})

export class CrearProductoComponent implements OnInit{

  public crearProductoForm: FormGroup;
  public usuario:string;
  public proveedor: Proveedor;
  public producto: Producto;
  public token: string;
  public imagenesSubir: File[];
  public imgTemp: any = null;
  formSubmited:boolean = false;

  

  constructor(private fb:FormBuilder,
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    private subirImagenService: SubirImagenService,
    private router:Router) {

      this.usuario =localStorage.getItem('usuario');
      this.token =localStorage.getItem('token');

    }

  async ngOnInit() {
    if(this.usuario === "proveedor" && this.token != null){

      this.crearProductoForm = this.fb.group({
        titulo:['', Validators.required],
        descripcion:['', Validators.required],
        categoria:['', [ Validators.required] ],
        unidadesMinimas:['', Validators.required],
        stock:['', Validators.required],
        precio:['', Validators.required],
        datosTecnicos: this.fb.array([this.fb.group({
          datosTecnicosTitulo:['' ],
          datosTecnicosDescripcion:['' ]
      })]),
      
        subcategoria:[''],
      });

      this.proveedor = await this.usuarioService.getProveedor();

    }else{
      console.log("El usuario no es un proveedor");
    };
  }

  get datosTecnicos() {
    return this.crearProductoForm.get('datosTecnicos') as FormArray;
  }

  addDatosTecnicos() {
    this.datosTecnicos.push(this.fb.group({
      datosTecnicosTitulo:[' ' ],
      datosTecnicosDescripcion:[' ']}));

  }

  deleteDatosTecnicos(index) {
    this.datosTecnicos.removeAt(index);
  }
  
  async crearProducto(){
    if(this.crearProductoForm.invalid){
      this.crearProductoForm.markAllAsTouched()
      return;
    }
    this.formSubmited = true;
    console.log(this.crearProductoForm.value)
    const productoId =  await this.productoService.crearProducto(this.crearProductoForm.value);
    
    console.log(this.imagenesSubir);
    for(let imagen of this.imagenesSubir)
    this.subirImagenService.postearImagen(imagen, 'productos', productoId)
    .then( () => {
      Swal.fire('Guardado', 'Imagen de usuario subida', 'success');
    }).catch( err => {
      console.log(err);
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    });
  }

  campoNoValido (campo:string) :boolean{
    if(this.crearProductoForm.get(campo).invalid && this.formSubmited){
      return true;
    }else{
      return false;
    }
  }

  get imagenUrl(){
    if( this.usuario === "proveedor"){
      return `${base_url}/upload/productos/no-image`;
    }
  }

  multiplesImagenes(files: File[]){

    this.imagenesSubir = files;
    
    for(let file of files){
      if ( !file ) { 
        return this.imgTemp = null;
      }  
    const reader = new FileReader();
    reader.readAsDataURL( file );
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
    }
  }

  //Validaciones
  get tituloNoValido(){
    return this.tituloCampoRequerido
  }
  get tituloCampoRequerido(){
    return this.crearProductoForm.get('titulo').errors ? this.crearProductoForm.get('titulo').errors.required && this.crearProductoForm.get('titulo').touched : null
  }
  get descripcionNoValido(){
    return this.descripcionCampoRequerido
  }
  get descripcionCampoRequerido(){
    return this.crearProductoForm.get('descripcion').errors ? this.crearProductoForm.get('descripcion').errors.required && this.crearProductoForm.get('descripcion').touched : null
  }
  get unidadesMinimasNoValido(){
    return this.unidadesMinimasCampoRequerido
  }
  get unidadesMinimasCampoRequerido(){
    return this.crearProductoForm.get('unidadesMinimas').errors ? this.crearProductoForm.get('unidadesMinimas').errors.required && this.crearProductoForm.get('unidadesMinimas').touched : null
  }
  get stockNoValido(){
    return this.stockCampoRequerido
  }
  get stockCampoRequerido(){
    return this.crearProductoForm.get('stock').errors ? this.crearProductoForm.get('stock').errors.required && this.crearProductoForm.get('stock').touched : null
  }
  get precioNoValido(){
    return this.precioCampoRequerido
  }
  get precioCampoRequerido(){
    return this.crearProductoForm.get('precio').errors ? this.crearProductoForm.get('precio').errors.required && this.crearProductoForm.get('precio').touched : null
  }

  }

