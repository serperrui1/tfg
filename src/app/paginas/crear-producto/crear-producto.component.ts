import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public imagenSubir: File;
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
      this.proveedor = await this.usuarioService.getProveedor();
        console.log(this.proveedor);
      this.crearProductoForm = this.fb.group({
        titulo:['', Validators.required],
        descripcion:['', Validators.required],
        categoria:['', [ Validators.required] ],
        unidadesMinimas:['', Validators.required],
        stock:['', Validators.required],
        precio:['', Validators.required],
        /* imagenes:['', Validators.required], */
       /*  datosTecnicosTitulo:['', Validators.required ],
        datosTecnicosDescripcion:['', Validators.required ], */
        subcategoria:[''],
      });
    }else{
      console.log("El usuario no es un proveedor");
    };
  }

  async crearProducto(){
    this.formSubmited = true;
    console.log(this.crearProductoForm.value);
    if(this.crearProductoForm.invalid){
      return;
    }
    const productoId =  await this.productoService.crearProducto(this.crearProductoForm.value);
    
    console.log(productoId);
    this.subirImagenService.postearImagen(this.imagenSubir, 'productos', productoId)
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

  prepararImagen( file: File ) {
    this.imagenSubir = file;
    if ( !file ) { 
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL( file );
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  async subirImagen() {
    if(this.usuario === "proveedor"){
      this.subirImagenService
      .postearImagen( this.imagenSubir, 'productos', this.producto._id)
      .then( () => {
        Swal.fire('Guardado', 'Imagen de usuario subida', 'success');
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })
    }
  }

  get imagenUrl(){
    if( this.usuario === "proveedor"){
      return `${base_url}/upload/productos/no-image`;
    }
  }

  }

