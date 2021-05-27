import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Comprador } from 'src/app/models/comprador';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment'
import { Proveedor } from 'src/app/models/proveedor';
import { Administrador } from 'src/app/models/administrador';
import { AsistenteTecnico } from 'src/app/models/asistente';
import { CargaImagenenesService } from 'src/app/services/carga-imagenenes.service';
const base_url = environment.base_url;

@Component({
  selector: 'app-comprador-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class perfilComponent implements OnInit {

  autonomo:boolean = false;
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
  public urlImagen:string
  /* public accesoDenegado: boolean = false; */

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private cargaImagenService: CargaImagenenesService,
    private fileUploadService: FileUploadService) { 
   this.usuario =localStorage.getItem('usuario') || "";
  }

  async ngOnInit() {
    if(this.usuario==="comprador"){
    this.comprador = await this.usuarioService.getComprador();
   
     this.perfilCompradorForm = this.fb.group({
      nombre:[this.comprador.nombre, Validators.required],
      apellidos:[this.comprador.apellidos, Validators.required],
      fechaRegistro:[this.comprador.fechaRegistro],
      email:[this.comprador.email,[ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')] ],
      numeroTelefono: [this.comprador.numeroTelefono, [Validators.required, this.telefonoFormatoNoValido]],
      fechaNacimiento:[this.comprador.fechaNacimiento, [ Validators.required, this.fechaAnteriorAHoy]],
      paisResidencia:[this.comprador.paisResidencia,[ Validators.required] ],
      ciudad:[this.comprador.ciudad,[ Validators.required] ],
      localidad:[this.comprador.localidad,[ Validators.required] ],
      direccionResidencia:[this.comprador.direccionResidencia,[ Validators.required] ],
      codigoPostal:[this.comprador.codigoPostal,[ Validators.required, this.codigoPostalFormatoNoValido] ],
      img:['']
    });

  }else if(this.usuario==="proveedor"){
    this.proveedor = await this.usuarioService.getProveedor();

     this.perfilProveedorForm = this.fb.group({
      nombreEmpresa: [ this.proveedor.nombreEmpresa , Validators.required ],
      fechaRegistro:[this.proveedor.fechaRegistro],
      autonomo: [ this.proveedor.autonomo ],
      sector: [ this.proveedor.sector],
      email:[this.proveedor.email,[ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')] ],
      registroMercantil:[this.proveedor.registroMercantil,[ , Validators.pattern('^[A-Z]{1}[-][0-9]{8}$')] ],
      nif:[this.proveedor.nif,[, Validators.pattern('^[0-9]{8}[A-Z]{1}$')] ],
      direccion: [ this.proveedor.direccion , Validators.required ],
      cuentaBancariaIBAN:[this.proveedor.cuentaBancariaIBAN,[ Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{22}$')] ],
      titularCuenta: [ this.proveedor.titularCuenta , Validators.required ],
      img:['']

    });

  }else if(this.usuario==="administrador"){
    this.administrador = await this.usuarioService.getAdministrador();

     this.perfilAdministradorForm = this.fb.group({
      nombre: [ this.administrador.nombre , Validators.required ],
      apellidos: [ this.administrador.apellidos , Validators.required ],
      email:[this.administrador.email],
      img:['']
    });

  }else if(this.usuario==="asistenteTecnico"){
    this.asistenteTecnico = await this.usuarioService.getAsistenteTecnico();

     this.perfilAsistenteTecnicoForm = this.fb.group({
      nombre: [ this.asistenteTecnico.nombre , Validators.required ],
      apellidos: [ this.asistenteTecnico.apellidos , Validators.required ],
      email:[this.asistenteTecnico.email],
      img:['']

    });
  }
  }


async actualizarCompradorPerfil() {

    if(this.perfilCompradorForm.invalid){
      this.perfilCompradorForm.markAllAsTouched()
      return;
    }
    await this.subirImagen(this.imagenSubir);
    this.perfilCompradorForm.controls['img'].setValue(this.urlImagen);
    this.perfilCompradorForm.controls['nombre'].setValue(this.perfilCompradorForm.controls['nombre'].value.trim());
    this.perfilCompradorForm.controls['apellidos'].setValue(this.perfilCompradorForm.controls['apellidos'].value.trim());
    this.perfilCompradorForm.controls['paisResidencia'].setValue(this.perfilCompradorForm.controls['paisResidencia'].value.trim());
    this.perfilCompradorForm.controls['ciudad'].setValue(this.perfilCompradorForm.controls['ciudad'].value.trim());
    this.perfilCompradorForm.controls['localidad'].setValue(this.perfilCompradorForm.controls['localidad'].value.trim());
    this.perfilCompradorForm.controls['direccionResidencia'].setValue(this.perfilCompradorForm.controls['direccionResidencia'].value.trim());
    this.usuarioService.actualizarCompradorPerfil( this.perfilCompradorForm.value, this.comprador.uid ).subscribe( () => {
      Swal.fire({
        title: 'Perfil actualizado.',
        icon: 'success',
        confirmButtonText: `Ok`,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
    }, (err)=> {
      Swal.fire('Error', err.error.msg, 'error');
    });

  }
  
  async actualizarProveedorPerfil() {

  if(this.perfilProveedorForm.invalid){
    this.perfilProveedorForm.markAllAsTouched()
    return;
  }

  if(this.autonomo){
    this.perfilProveedorForm.value["registroMercantil"] = "";
  }else{
    this.perfilProveedorForm.value["nif"] = "";
  }

  await this.subirImagen(this.imagenSubir);
  this.perfilProveedorForm.controls['img'].setValue(this.urlImagen);
  this.perfilProveedorForm.controls['nombreEmpresa'].setValue(this.perfilProveedorForm.controls['nombreEmpresa'].value.trim());
  this.perfilProveedorForm.controls['titularCuenta'].setValue(this.perfilProveedorForm.controls['titularCuenta'].value.trim());
  this.perfilProveedorForm.controls['direccion'].setValue(this.perfilProveedorForm.controls['direccion'].value.trim());
  this.usuarioService.actualizarProveedorPerfil( this.perfilProveedorForm.value, this.proveedor.uid ).subscribe( () => {
    Swal.fire({
      title: 'Perfil actualizado.',
      icon: 'success',
      confirmButtonText: `Ok`,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }, (err)=> {
    Swal.fire('Error', err.error.msg, 'error');
  });

}

async actualizarAdministradorPerfil() {

    if(this.perfilAdministradorForm.invalid){
      this.perfilAdministradorForm.markAllAsTouched()
      return;
    }
    
    await this.subirImagen(this.imagenSubir);
    this.perfilAdministradorForm.controls['img'].setValue(this.urlImagen);
    this.perfilAdministradorForm.controls['nombre'].setValue(this.perfilAdministradorForm.controls['nombre'].value.trim());
    this.perfilAdministradorForm.controls['apellidos'].setValue(this.perfilAdministradorForm.controls['apellidos'].value.trim());
    this.usuarioService.actualizarAdministradorPerfil( this.perfilAdministradorForm.value, this.administrador.uid ).subscribe( () => {
      Swal.fire({
        title: 'Perfil actualizado.',
        icon: 'success',
        confirmButtonText: `Ok`,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
    }, (err)=> {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  async actualizarAsistenteTecnicoPerfil() {

  if(this.perfilAsistenteTecnicoForm.invalid){
    this.perfilAsistenteTecnicoForm.markAllAsTouched()
    return;
  }
  await this.subirImagen(this.imagenSubir);
  this.perfilAsistenteTecnicoForm.controls['img'].setValue(this.urlImagen);
  this.perfilAsistenteTecnicoForm.controls['nombre'].setValue(this.perfilAsistenteTecnicoForm.controls['nombre'].value.trim());
  this.perfilAsistenteTecnicoForm.controls['apellidos'].setValue(this.perfilAsistenteTecnicoForm.controls['apellidos'].value.trim());
  this.usuarioService.actualizarAsistenteTecnicoPerfil( this.perfilAsistenteTecnicoForm.value, this.asistenteTecnico.uid ).subscribe( () => {
    Swal.fire({
      title: 'Perfil actualizado.',
      icon: 'success',
      confirmButtonText: `Ok`,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }, (err)=> {
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

  async subirImagen(imagenSubir:File){
    let nombre = Math.random().toString() + imagenSubir.name; 
    await this.cargaImagenService.subirCloudStorage(nombre, imagenSubir);
    this.urlImagen = await this.cargaImagenService.referenciaCloudStorage(nombre);
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

  //PROVEEDOR VALIDACIONES
  get nombreEmpresaNoValido(){
    return this.nombreEmpresaRequerido
  }
  get nombreEmpresaRequerido(){
    return this.perfilProveedorForm.get('nombreEmpresa').errors ? this.perfilProveedorForm.get('nombreEmpresa').errors.required && this.perfilProveedorForm.get('nombreEmpresa').touched : null
  }

  get emailProveedorNoValido(){
    return this.emailProveedorRequerido || this.emailProveedorFormato
  }
  get emailProveedorRequerido(){
    return this.perfilProveedorForm.get('email').errors ? this.perfilProveedorForm.get('email').errors.required && this.perfilProveedorForm.get('email').touched : null
  }
  get emailProveedorFormato(){
    return this.perfilProveedorForm.get('email').errors ? this.perfilProveedorForm.get('email').errors.pattern && this.perfilProveedorForm.get('email').touched : null
  }

  get direccionProveedorNoValido(){
    return this.direccionProveedorRequerido
  }
  get direccionProveedorRequerido(){
    return this.perfilProveedorForm.get('direccion').errors ? this.perfilProveedorForm.get('direccion').errors.required && this.perfilProveedorForm.get('direccion').touched : null
  }

  get cifFormato(){
    return this.perfilProveedorForm.get('registroMercantil').errors ? this.perfilProveedorForm.get('registroMercantil').errors.pattern && this.perfilProveedorForm.get('registroMercantil').touched : null
  }

  get nifFormato(){
    return this.perfilProveedorForm.get('nif').errors ? this.perfilProveedorForm.get('nif').errors.pattern && this.perfilProveedorForm.get('nif').touched : null
  }

  get ibanProveedorNoValido(){
    return this.ibanProveedorRequerido || this.ibanProveedorFormato
  }
  get ibanProveedorRequerido(){
    return this.perfilProveedorForm.get('cuentaBancariaIBAN').errors ? this.perfilProveedorForm.get('cuentaBancariaIBAN').errors.required && this.perfilProveedorForm.get('cuentaBancariaIBAN').touched : null
  }
  get ibanProveedorFormato(){
    return this.perfilProveedorForm.get('cuentaBancariaIBAN').errors ? this.perfilProveedorForm.get('cuentaBancariaIBAN').errors.pattern && this.perfilProveedorForm.get('cuentaBancariaIBAN').touched : null
  }

  get titularProveedorNoValido(){
    return this.titularProveedorRequerido || this.titularProveedorFormato
  }
  get titularProveedorRequerido(){
    return this.perfilProveedorForm.get('titularCuenta').errors ? this.perfilProveedorForm.get('titularCuenta').errors.required && this.perfilProveedorForm.get('titularCuenta').touched : null
  }
  get titularProveedorFormato(){
    return this.perfilProveedorForm.get('titularCuenta').errors ? this.perfilProveedorForm.get('titularCuenta').errors.pattern && this.perfilProveedorForm.get('titularCuenta').touched : null
  }

  nifCifNoValidos(){
    const cif = this.perfilProveedorForm.get('registroMercantil').value;
    const nif = this.perfilProveedorForm.get('nif').value;
    if(cif == "" && nif == ""){
      return true;
    }else if (cif == "" && nif != "" || cif != "" && nif == ""){
      return false;
    }
  }

  //ADMINISTRADOR VALIDACIONES
get nombreAdministradorRequerido(){
  return this.perfilAdministradorForm.get('nombre').errors ? this.perfilAdministradorForm.get('nombre').errors.required && this.perfilAdministradorForm.get('nombre').touched : null
}
get nombreAdministradorNoValido(){
  return this.nombreAdministradorRequerido
}

get apellidosAdministradorRequerido(){
  return this.perfilAdministradorForm.get('apellidos').errors ? this.perfilAdministradorForm.get('apellidos').errors.required && this.perfilAdministradorForm.get('apellidos').touched : null
}
get apellidosAdministradorNoValido(){
  return this.apellidosAdministradorRequerido
}

//ASISTENTE VALIDACIONES VALIDACIONES
get nombreAsistenteRequerido(){
  return this.perfilAsistenteTecnicoForm.get('nombre').errors ? this.perfilAsistenteTecnicoForm.get('nombre').errors.required && this.perfilAsistenteTecnicoForm.get('nombre').touched : null
}
get nombreAsistenteNoValido(){
  return this.nombreAsistenteRequerido
}

get apellidosAsistenteRequerido(){
  return this.perfilAsistenteTecnicoForm.get('apellidos').errors ? this.perfilAsistenteTecnicoForm.get('apellidos').errors.required && this.perfilAsistenteTecnicoForm.get('apellidos').touched : null
}
get apellidosAsistenteNoValido(){
  return this.apellidosAsistenteRequerido
}

  //COMPRADOR VALIDACIONES
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

  get direccionCompradorRequerido(){
    return this.perfilCompradorForm.get('direccionResidencia').errors ? this.perfilCompradorForm.get('direccionResidencia').errors.required && this.perfilCompradorForm.get('direccionResidencia').touched : null
  }
  get direccionCompradorNoValido(){
    return this.direccionCompradorRequerido
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

  get paisCompradorRequerido(){
    return this.perfilCompradorForm.get('paisResidencia').errors ? this.perfilCompradorForm.get('paisResidencia').errors.required && this.perfilCompradorForm.get('paisResidencia').touched : null
  }
  get paisCompradorNoValido(){
    return this.paisCompradorRequerido
  }
  
  get fechaNoValido(){
    return this.fechaNacimientoRequerido || this.fechaFechaAnteriorAHoy
  }
  get fechaNacimientoRequerido(){
    return this.perfilCompradorForm.get('fechaNacimiento').errors ? this.perfilCompradorForm.get('fechaNacimiento').errors.required && this.perfilCompradorForm.get('fechaNacimiento').touched : null
  }
  get fechaFechaAnteriorAHoy(){
    return this.perfilCompradorForm.get('fechaNacimiento').errors ? this.perfilCompradorForm.get('fechaNacimiento').errors.fechaAnteriorAHoy && this.perfilCompradorForm.get('fechaNacimiento').touched : null
  }

  get codigoPostalCompradorNoValido(){
    return this.codigoPostalCompradorRequerido || this.codigoPostalFormato
  }
  get codigoPostalCompradorRequerido(){
    return this.perfilCompradorForm.get('codigoPostal').errors ? this.perfilCompradorForm.get('codigoPostal').errors.required && this.perfilCompradorForm.get('codigoPostal').touched : null
  }
  get codigoPostalFormato(){
    return this.perfilCompradorForm.get('codigoPostal').errors ? this.perfilCompradorForm.get('codigoPostal').errors.codigoPostalFormatoNoValido && this.perfilCompradorForm.get('codigoPostal').touched : null
  }

  get tlfCompradorNoValido(){
    return this.tlfCompradorRequerido || this.telefonoFormato
  }
  get tlfCompradorRequerido(){
    return this.perfilCompradorForm.get('numeroTelefono').errors ? this.perfilCompradorForm.get('numeroTelefono').errors.required && this.perfilCompradorForm.get('numeroTelefono').touched : null
  }
  get telefonoFormato(){
    return this.perfilCompradorForm.get('numeroTelefono').errors ? this.perfilCompradorForm.get('numeroTelefono').errors.telefonoFormatoNoValido && this.perfilCompradorForm.get('numeroTelefono').touched : null
  }

  get emailCompradorNoValido(){
    return this.emailCompradorRequerido || this.emailFormatoNoValido
  }
  get emailCompradorRequerido(){
    return this.perfilCompradorForm.get('email').errors ? this.perfilCompradorForm.get('email').errors.required && this.perfilCompradorForm.get('email').touched : null
  }
  get emailFormatoNoValido(){
    return this.perfilCompradorForm.get('email').errors ? this.perfilCompradorForm.get('email').errors.pattern && this.perfilCompradorForm.get('email').touched : null
  }


  //VALIDACIONES PERSONALIZADAS
  private fechaAnteriorAHoy(control:FormControl):{[s:string]:boolean}{
    let f = Date.parse(control.value)
    let hoy = new Date().getTime()
    if(f > hoy){
      return {
        fechaAnteriorAHoy:true
      }
    }
    return null
  }

  private codigoPostalFormatoNoValido(control:FormControl):{[s:string]:boolean}{
    const pattern = "^[0-9]{5}$"
    let cP = String(control.value);
    if(!cP.match(pattern)){
      return {
        codigoPostalFormatoNoValido:true
      }
    }
    return null
  }

  private telefonoFormatoNoValido(control:FormControl):{[s:string]:boolean}{
    const pattern = "^[0-9]{9}$"
    let cP = String(control.value);
    if(!cP.match(pattern)){
      return {
        telefonoFormatoNoValido:true
      }
    }
    return null
  }

}
