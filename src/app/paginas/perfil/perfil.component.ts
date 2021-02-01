import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comprador } from 'src/app/models/comprador';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment'
import { Proveedor } from 'src/app/models/proveedor';
const base_url = environment.base_url;

@Component({
  selector: 'app-comprador-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class CompradorPerfilComponent implements OnInit {
  public perfilCompradorForm: FormGroup;
  public perfilProveedorForm: FormGroup;
  public comprador: Comprador;
  public proveedor: Proveedor;
  public imagenSubir: File;
  public imgTemp: any = null;
  public usuario:string;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService) { 

   this.usuario =localStorage.getItem('usuario') || "";


   
  }

  async ngOnInit() {
    if(this.usuario==="comprador"){
    this.comprador = await this.usuarioService.getComprador();
   

     this.perfilCompradorForm = this.fb.group({
      nombre: [ this.comprador.nombre , Validators.required ],
      email: [ this.comprador.email, [ Validators.required, Validators.email ] ],
      apellidos: [ this.comprador.apellidos , Validators.required ],
      fechaNacimiento: [ this.comprador.fechaNacimiento , Validators.required ],
      paisResidencia: [ this.comprador.paisResidencia , Validators.required ],
      ciudad: [ this.comprador.ciudad , Validators.required ],
      localidad: [ this.comprador.localidad , Validators.required ],
      direccionResidencia: [ this.comprador.direccionResidencia , Validators.required ],
      tarjetaCredito: [ this.comprador.tarjetaCredito  ],
      cuentaPaypal: [ this.comprador.cuentaPaypal ]

    });
  }else if(this.usuario==="proveedor"){
    this.proveedor = await this.usuarioService.getProveedor();
    console.log(this.proveedor);

     this.perfilProveedorForm = this.fb.group({
      nombreEmpresa: [ this.proveedor.nombreEmpresa , Validators.required ],
      autonomo: [ this.proveedor.autonomo , Validators.required ],
      sector: [ this.proveedor.sector , Validators.required ],
      email: [ this.proveedor.email , Validators.required ],
      registroMercantil:[ this.proveedor.nombreEmpresa ],
      nif: [ this.proveedor.nombreEmpresa ],
      direccion: [ this.proveedor.direccion , Validators.required ],
      cuentaBancaria: [ this.proveedor.cuentaBancaria , Validators.required ],
      titularCuenta: [ this.proveedor.titularCuenta , Validators.required ]

    });
  }
  }
  actualizarCompradorPerfil() {
  this.usuarioService.actualizarCompradorPerfil( this.perfilCompradorForm.value, this.comprador.uid )
  .subscribe( () => {
    const { nombre, email } = this.perfilCompradorForm.value;
    this.comprador.nombre = nombre;
    this.comprador.email = email;
    

    Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
  }, (err) => {
    console.log(err)
    Swal.fire('Error', err.error.msg, 'error');
  });
}
actualizarProveedorPerfil() {
  this.usuarioService.actualizarProveedorPerfil( this.perfilProveedorForm.value, this.proveedor.uid )
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

  subirImagen() {
    if(this.usuario==="comprador"){
      this.fileUploadService
      .actualizarFoto( this.imagenSubir, 'compradores', this.comprador.uid )
      .then( img => {
        this.comprador.img = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })
    }

    else if(this.usuario==="proveedor"){
      console.log(this.imagenSubir)
      this.fileUploadService
      .actualizarFoto( this.imagenSubir, 'proveedores', this.proveedor.uid )
      .then( img => {
        this.proveedor.img = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })
    }
    
   
    
  }

  get imagenUrl(){
    if(this.usuario==="comprador"){
      if(this.comprador.img.includes('http')){
        return this.comprador.img;
      }
      if(this.comprador.img){
          return `${base_url}/upload/compradores/${ this.comprador.img }`;
      }
      else{
          return `${base_url}/upload/compradrores/no-image`;
      }
    }else if( this.usuario==="proveedor"){
      if(this.proveedor.img.includes('http')){
        return this.proveedor.img;
      }
      if(this.proveedor.img){
          return `${base_url}/upload/proveedores/${ this.proveedor.img }`;
      }
      else{
          return `${base_url}/upload/proovedores/no-image`;
      }
    }
  }
}
