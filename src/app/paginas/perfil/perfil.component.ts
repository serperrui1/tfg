import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comprador } from 'src/app/models/comprador';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment'
import { Proveedor } from 'src/app/models/proveedor';
import { Administrador } from 'src/app/models/administrador';
import { AsistenteTecnico } from 'src/app/models/asistente';
const base_url = environment.base_url;

@Component({
  selector: 'app-comprador-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class perfilComponent implements OnInit {
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
      codigoPostal: [ this.comprador.codigoPostal , Validators.required ],
      numeroTelefono: [ this.comprador.numeroTelefono],
      direccionResidencia: [ this.comprador.direccionResidencia , Validators.required ],


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
      apellidos: [ this.administrador.apellidos , Validators.required ],
      email: [ this.administrador.email, [ Validators.required, Validators.email ] ]

    });

  }else if(this.usuario==="asistenteTecnico"){
    this.asistenteTecnico = await this.usuarioService.getAsistenteTecnico();
    console.log(this.asistenteTecnico);

     this.perfilAsistenteTecnicoForm = this.fb.group({
      nombre: [ this.asistenteTecnico.nombre , Validators.required ],
      apellidos: [ this.asistenteTecnico.apellidos , Validators.required ],
      email: [ this.asistenteTecnico.email, [ Validators.required, Validators.email ] ]

    });
  }
  }
  actualizarCompradorPerfil() {
    if(this.perfilCompradorForm.invalid){
      Swal.fire('Error', "Complete todos los campos", 'error');
    }else{
    this.usuarioService.actualizarCompradorPerfil( this.perfilCompradorForm.value, this.comprador.uid ).subscribe( () => {
    const { nombre, email } = this.perfilCompradorForm.value;
    this.comprador.nombre = nombre;
    this.comprador.email = email;
    

    Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
  }, (err) => {
    console.log(err)
    Swal.fire('Error', err.error.msg, 'error');
  });
    }
  
}
actualizarProveedorPerfil() {
  if(this.perfilProveedorForm.invalid){
    this.perfilProveedorForm.markAllAsTouched()
    return;
  }
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
    else if(this.usuario==="asistenteTecnico"){
      console.log(this.imagenSubir)
      this.fileUploadService
      .actualizarFoto( this.imagenSubir, 'asistentes', this.asistenteTecnico.uid )
      .then( img => {
        this.asistenteTecnico.img = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })
    }
    else if(this.usuario==="administrador"){
      console.log(this.imagenSubir)
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
          return `${base_url}/upload/no-image`;
      }
    }else if( this.usuario==="proveedor"){
      if(this.proveedor.img.includes('http')){
        return this.proveedor.img;
      }
      if(this.proveedor.img){
          return `${base_url}/upload/proveedores/${ this.proveedor.img }`;
      }
      else{
          return `${base_url}/upload/no-image`;
      }
    }else if( this.usuario==="asistenteTecnico"){
      if(this.asistenteTecnico.img.includes('http')){
        return this.asistenteTecnico.img;
      }
      if(this.asistenteTecnico.img){
          return `${base_url}/upload/asistentes/${ this.asistenteTecnico.img }`;
      }
      else{
          return `${base_url}/upload/no-image`;
      }
    }else if( this.usuario==="administrador"){
      if(this.administrador.img.includes('http')){
        return this.administrador.img;
      }
      if(this.administrador.img){
          return `${base_url}/upload/administradores/${ this.administrador.img }`;
      }
      else{
          return `${base_url}/upload/no-image`;
      }
    }
  }

  //Validaciones
  get nombreEmpresaNoValido(){
    return this.nombreEmpresaRequerido
  }
  get nombreEmpresaRequerido(){
    return this.perfilProveedorForm.get('nombreEmpresa').errors ? this.perfilProveedorForm.get('nombreEmpresa').errors.required && this.perfilProveedorForm.get('nombreEmpresa').touched : null
  }
  get emailNoValido(){
    return this.emailRequerido
  }
  get emailRequerido(){
    return this.perfilProveedorForm.get('email').errors ? this.perfilProveedorForm.get('email').errors.required && this.perfilProveedorForm.get('email').touched : null
  }
  get registroMercantilNoValido(){
    return this.registroMercantilRequerido
  }
  get registroMercantilRequerido(){
    return this.perfilProveedorForm.get('registroMercantil').errors ? this.perfilProveedorForm.get('registroMercantil').errors.required && this.perfilProveedorForm.get('registroMercantil').touched : null
  }
  get nifNoValido(){
    return this.nifRequerido
  }
  get nifRequerido(){
    return this.perfilProveedorForm.get('nif').errors ? this.perfilProveedorForm.get('nif').errors.required && this.perfilProveedorForm.get('nif').touched : null
  }
  get cuentaBancariaNoValida(){
    return this.cuentaBancariaRequerido
  }
  get cuentaBancariaRequerido(){
    return this.perfilProveedorForm.get('cuentaBancaria').errors ? this.perfilProveedorForm.get('cuentaBancaria').errors.required && this.perfilProveedorForm.get('cuentaBancaria').touched : null
  }
  get direccionNoValido(){
    return this.direccionRequerido
  }
  get direccionRequerido(){
    return this.perfilProveedorForm.get('direccion').errors ? this.perfilProveedorForm.get('direccion').errors.required && this.perfilProveedorForm.get('direccion').touched : null
  }
  get titularNoValido(){
    return this.titularRequerido
  }
  get titularRequerido(){
    return this.perfilProveedorForm.get('titularCuenta').errors ? this.perfilProveedorForm.get('titularCuenta').errors.required && this.perfilProveedorForm.get('titularCuenta').touched : null
  }




  get nombreCompradorRequerido(){
    return this.perfilCompradorForm.get('nombre').errors ? this.perfilCompradorForm.get('nombre').errors.required && this.perfilCompradorForm.get('nombre').touched : null
  }
  get nombreCompradorNoValido(){
    return this.nombreCompradorRequerido
  }
  get apellidosCompradorRequerido(){
    return this.perfilCompradorForm.get('apellidos').errors ? this.perfilCompradorForm.get('apellidos').errors.required && this.perfilCompradorForm.get('apellidos').touched : null
  }
  get apellidosCompradorNoValido(){
    return this.apellidosCompradorRequerido
  }
  get fechaNacimientoCompradorRequerido(){
    return this.perfilCompradorForm.get('fechaNacimiento').errors ? this.perfilCompradorForm.get('fechaNacimiento').errors.required && this.perfilCompradorForm.get('fechaNacimiento').touched : null
  }
  get fechaNacimientoCompradorNoValido(){
    return this.fechaNacimientoCompradorRequerido
  }
  get paisCompradorRequerido(){
    return this.perfilCompradorForm.get('paisResidencia').errors ? this.perfilCompradorForm.get('paisResidencia').errors.required && this.perfilCompradorForm.get('paisResidencia').touched : null
  }
  get paisCompradorNoValido(){
    return this.paisCompradorRequerido
  }
  get ciudadCompradorRequerido(){
    return this.perfilCompradorForm.get('ciudad').errors ? this.perfilCompradorForm.get('ciudad').errors.required && this.perfilCompradorForm.get('ciudad').touched : null
  }
  get ciudadCompradorNoValido(){
    return this.ciudadCompradorRequerido
  }
  get localidadCompradorRequerido(){
    return this.perfilCompradorForm.get('localidad').errors ? this.perfilCompradorForm.get('localidad').errors.required && this.perfilCompradorForm.get('localidad').touched : null
  }
  get localidadCompradorNoValido(){
    return this.localidadCompradorRequerido
  }
  get emailCompradorRequerido(){
    return this.perfilCompradorForm.get('email').errors ? this.perfilCompradorForm.get('email').errors.required && this.perfilCompradorForm.get('email').touched : null
  }
  get emailCompradorNoValido(){
    return this.emailCompradorRequerido
  }
  get tlfCompradorRequerido(){
    return this.perfilCompradorForm.get('numeroTelefono').errors ? this.perfilCompradorForm.get('numeroTelefono').errors.required && this.perfilCompradorForm.get('numeroTelefono').touched : null
  }
  get tlfCompradorNoValido(){
    return this.tlfCompradorRequerido
  }
  get direccionCompradorRequerido(){
    return this.perfilCompradorForm.get('direccionResidencia').errors ? this.perfilCompradorForm.get('direccionResidencia').errors.required && this.perfilCompradorForm.get('direccionResidencia').touched : null
  }
  get direccionCompradorNoValido(){
    return this.direccionCompradorRequerido
  }
  get codigoPostalCompradorRequerido(){
    return this.perfilCompradorForm.get('codigoPostal').errors ? this.perfilCompradorForm.get('codigoPostal').errors.required && this.perfilCompradorForm.get('codigoPostal').touched : null
  }
  get codigoPostalCompradorNoValido(){
    return this.codigoPostalCompradorRequerido
  }
  

}
