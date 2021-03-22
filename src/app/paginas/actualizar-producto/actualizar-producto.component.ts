import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { DatosTecnicos } from '../../models/datosTecnicos';
import { ProductoService } from 'src/app/services/producto.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';
import { SubirImagenService } from 'src/app/services/subir-imagen.service';


const base_url = environment.base_url;


@Component({
  selector: 'actualizar-app-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {
  
  public productoForm: FormGroup;
  public producto: Producto;
  public imagenSubir: File;
  public imgTemp: any = null;
  public proveedor:string;
  public id: string;
  public token: string;
  public usuario:string;
  public direccionImagen = base_url+"/upload/productos/"
  public imagenesSubir: File[];

  constructor(private activatedRoute: ActivatedRoute,
    private fb:FormBuilder,
    private productoService: ProductoService,
    private fileUploadService: FileUploadService,
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private subirImagenService: SubirImagenService){

      this.usuario =localStorage.getItem('usuario');
      this.token =localStorage.getItem('token');

  }

  async ngOnInit() {
    if(this.usuario === "proveedor" && this.token != null) {
      this.activatedRoute.params.subscribe( params => {
        this.id = params['id']; 
      });

      this.producto= await this.productoService.getProductoPorID(this.id);
      this.proveedor = await this.usuarioService.getProveedorNombre(this.producto.proveedor)
      this.producto.proveedorNombre = this.proveedor;
  
      this.productoForm = this.fb.group({
        titulo: [ this.producto.titulo, Validators.required ],
        descripcion: [ this.producto.descripcion, Validators.required ],
        categoria: [ this.producto.categoria,  Validators.required ],
        unidadesMinimas: [ this.producto.unidadesMinimas,  Validators.required ],
        stock: [ this.producto.stock,  Validators.required ],
        precio: [ this.producto.precio,  Validators.required ],
        subcategoria:[ this.producto.subcategoria ],
        datosTecnicos: this.fb.array([this.fb.group({
          datosTecnicosTitulo:[],
          datosTecnicosDescripcion:[]
      })])
      });

    }else{
      console.log("Acceso denegado para actualizar este producto");
    };
  }
  
  get datosTecnicos() {
    return this.productoForm.get('datosTecnicos') as FormArray;
  }

  addDatosTecnicos() {
    this.datosTecnicos.push(this.fb.group({
      datosTecnicosTitulo:['' ],
      datosTecnicosDescripcion:['']}));
  }

  deleteDatosTecnicos(index) {
    this.datosTecnicos.removeAt(index);
  }

  borrarDatosTecnicos(datos:DatosTecnicos) {
  Swal.fire({
      title: '¿Borrar el Dato Técnico?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo'
    }).then((result) => {
      if (result.value) {

    const index = this.producto.datosTecnicos.indexOf(datos);
    if (index > -1) {
      this.producto.datosTecnicos.splice(index, 1);
    }
  }
})
}



  actualizarProducto() {
    let productoActualizar = this.productoForm.value
    if(productoActualizar.datosTecnicos[0].datosTecnicosTitulo== null){
      productoActualizar.datosTecnicos.splice(0, 1);
    }
    productoActualizar.datosTecnicosAntiguos = this.producto.datosTecnicos;
    this.productoService.actualizarProducto( productoActualizar, this.producto._id )
    .subscribe( () => {
      Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
    }, (err) => {
      console.log(err)
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  cambiarImagen( file: File ) {
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

  async subirImagenes() {
    if(this.usuario === "proveedor"){
      for(let imagen of this.imagenesSubir)
      this.subirImagenService.postearImagen(imagen, 'productos', this.producto._id)
      .then( () => {
        Swal.fire('Guardado', 'Imagen de usuario subida', 'success');
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
    }
  }

  get imagenUrl(){
    if(this.usuario === "proveedor"){
      if(this.producto.imagenes.includes('http')){
        return this.producto.imagenes;
      }
      if(this.producto.imagenes){
          return `${base_url}/upload/productos/${ this.producto.imagenes }`;
      }
      else{
          return `${base_url}/upload/productos/no-image`;
      }
    }
  }

  borrarProducto( producto: Producto ) {

    this.productoService.borrarProducto( producto._id )
        .subscribe( resp => {
          Swal.fire( 'Borrado', producto.titulo, 'success' );
        });

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


}
