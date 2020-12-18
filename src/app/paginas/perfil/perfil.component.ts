import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comprador } from 'src/app/models/comprador';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment'
const base_url = environment.base_url;

@Component({
  selector: 'app-comprador-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class CompradorPerfilComponent implements OnInit {
  public perfilCompradorForm: FormGroup;
  public comprador: Comprador;
  public imagenSubir: File;
  public imgTemp: any = null;
  public usuario:string;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService) { 

   this.usuario =localStorage.getItem('usuario') || "";

   console.log(this.comprador)
   
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

  get imagenUrl(){
    if(this.comprador.img.includes('http')){
        return this.comprador.img;
    }
    if(this.comprador.img){
        return `${base_url}/upload/compradores/${ this.comprador.img }`;
    }
    else{
        return `${base_url}/upload/no-image`;
    }
}
}
