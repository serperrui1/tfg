import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comprador } from 'src/app/models/comprador';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment'
import { Proveedor } from 'src/app/models/proveedor';
import { AsistenteTecnico } from 'src/app/models/asistenteTecnico';
import { Administrador } from 'src/app/models/administrador';
const base_url = environment.base_url;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public perfilCompradorForm: FormGroup;
  public perfilProveedorForm: FormGroup;
  public perfilAdministradorForm: FormGroup;
  public perfilAsistenteTecnicoForm: FormGroup;
  public comprador: Comprador;
  public proveedor: Proveedor;
  public administrador: Administrador;
  public asistenteTecnico: AsistenteTecnico;
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

  }else if(this.usuario==="administrador"){
    this.administrador = await this.usuarioService.getAdministrador();
    console.log(this.administrador);

     this.perfilAdministradorForm = this.fb.group({
      nombre: [ this.administrador.nombre , Validators.required ],
      email: [ this.administrador.email, [ Validators.required, Validators.email ] ]

    });

  }else if(this.usuario==="asistenteTecnico"){
    this.asistenteTecnico = await this.usuarioService.getAsistenteTecnico();
    console.log(this.asistenteTecnico);

     this.perfilAsistenteTecnicoForm = this.fb.group({
      nombre: [ this.asistenteTecnico.nombre , Validators.required ],
      email: [ this.asistenteTecnico.email, [ Validators.required, Validators.email ] ]

    });
  }
  }

  actualizarCompradorPerfil() {
  this.usuarioService.actualizarCompradorPerfil( this.perfilCompradorForm.value, this.comprador.uid )
  .subscribe( () => {
    //Por qué nombre y email? creo que nada
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

actualizarAdministradorPerfil() {
  this.usuarioService.actualizarAdministradorPerfil( this.perfilAdministradorForm.value, this.administrador.uid )
  .subscribe( () => {
    Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
  }, (err) => {
    console.log(err)
    Swal.fire('Error', err.error.msg, 'error');
  });
}

actualizarAsistenteTecnicoPerfil() {
  this.usuarioService.actualizarAsistenteTecnicoPerfil( this.perfilAsistenteTecnicoForm.value, this.asistenteTecnico.uid )
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

    else if(this.usuario==="administrador"){
      this.fileUploadService
      .actualizarFoto( this.imagenSubir, 'administradores', this.administrador.uid )
      .then( img => {
        this.administrador.img = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })
    }

    else if(this.usuario==="asistenteTecnico"){
      this.fileUploadService
      .actualizarFoto( this.imagenSubir, 'asistentesTecnicos', this.asistenteTecnico.uid )
      .then( img => {
        this.asistenteTecnico.img = img;
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
    }
    
    else if( this.usuario==="proveedor"){
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
    
    else if( this.usuario==="administrador"){
      if(this.administrador.img.includes('http')){
        return this.administrador.img;
      }
      if(this.administrador.img){
          return `${base_url}/upload/administradores/${ this.administrador.img }`;
      }
      else{
          return `${base_url}/upload/administradores/no-image`;
      }
    }
    
    else if( this.usuario==="asistenteTecnico"){
      if(this.asistenteTecnico.img.includes('http')){
        return this.asistenteTecnico.img;
      }
      if(this.asistenteTecnico.img){
          return `${base_url}/upload/asistentesTecnicos/${ this.asistenteTecnico.img }`;
      }
      else{
          return `${base_url}/upload/asistentesTecnicos/no-image`;
      }
    }
  }
}
