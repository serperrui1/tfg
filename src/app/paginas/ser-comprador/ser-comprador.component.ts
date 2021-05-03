import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proveedor } from '../../models/proveedor';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ser-comprador',
  templateUrl: './ser-comprador.component.html',
  styleUrls: ['./ser-comprador.component.css']
})
export class SerCompradorComponent implements OnInit {
  formSubmited:boolean = false;
  public yaSoyComprador = false;
  public serCompradorForm: FormGroup;
  public proveedor: Proveedor;
  public usuario:string;
  public emailDB:string;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router:Router) {
      this.usuario = localStorage.getItem('usuario') || "";
    }

  async ngOnInit() {
    if(this.usuario === "proveedor"){
    this.proveedor = await this.usuarioService.getProveedor();

    if(await this.usuarioService.getCompradorEmail(this.proveedor.email) != ""){
      this.emailDB = await this.usuarioService.getCompradorEmail(this.proveedor.email);
    } else {
      this.emailDB = "";
    }
    this.compruebaYaSoyComprador();
   
     this.serCompradorForm = this.fb.group({
      nombre: [ '', Validators.required ],
      apellidos:['', Validators.required],
      email: [ this.proveedor.email, [Validators.required, Validators.email]],
      password:['', Validators.required],
      password2:['', Validators.required],
      fechaNacimiento: [ '', Validators.required ],
      paisResidencia: [ '', Validators.required ],
      ciudad: [ '', Validators.required ],
      localidad: [ '', Validators.required ],
      codigoPostal: [ '', Validators.required ],
      direccionResidencia: [ '', Validators.required ],
      terminos:['', Validators.required]

      }, {
        validators: this.passwordsIguales('password', 'password2')
      });
    }
  }

  crearComprador(){
    if(this.serCompradorForm.invalid){
      this.serCompradorForm.markAllAsTouched()
      return;
    }
    this.formSubmited = true;
    this.usuarioService.convertirseEnComprador(this.serCompradorForm.value);
    
  }

  campoNoValido (campo:string) :boolean{
    if(this.serCompradorForm.get(campo).invalid && this.formSubmited){
      return true;
    }else{
      return false;
    }
  }

  contrasenasNoValidas(){
    const pass1 = this.serCompradorForm.get('password').value;
    const pass2 = this.serCompradorForm.get('password2').value;

    if(((pass1!==pass2) && this.formSubmited)|| ((pass1=="" ||pass2=="") && this.formSubmited)){
      return true;
    }else{
      return false;
    }
  }

  aceptaTerminos(){
    return !this.serCompradorForm.get('terminos').value && this.formSubmited;
  }

  compruebaYaSoyComprador(){
    if(this.emailDB != ""){
      this.yaSoyComprador = true;
    }else{
      this.yaSoyComprador = false;
    }
  }
    

  passwordsIguales(passName1:string, passName2:string){
    return(formGroup : FormGroup) =>{

    const pass1Control = formGroup.get(passName1);
    const pass2Control = formGroup.get(passName2);

    if(pass1Control.value===pass2Control.value){
      pass2Control.setErrors(null)
    }else{
      pass2Control.setErrors({noEsIgual:true})
    }
    }
  }

  //Validaciones

  get nombreNoValido(){
    return this.nombreRequerido
  }
  get nombreRequerido(){
    return this.serCompradorForm.get('nombre').errors ? this.serCompradorForm.get('nombre').errors.required && this.serCompradorForm.get('nombre').touched : null
  }

  get cpNoValido(){
    return this.cpRequerido
  }
  get cpRequerido(){
    return this.serCompradorForm.get('codigoPostal').errors ? this.serCompradorForm.get('codigoPostal').errors.required && this.serCompradorForm.get('codigoPostal').touched : null
  }

  get fechaNoValido(){
    return this.fechaNacimientoRequerida || this.fechaNacimientoAnteriorAHoy
  }
  get fechaNacimientoRequerida(){
    return this.serCompradorForm.get('fechaNacimiento').errors ? this.serCompradorForm.get('fechaNacimiento').errors.required && this.serCompradorForm.get('fechaNacimiento').touched : null
  }
  get fechaNacimientoAnteriorAHoy(){
    return this.serCompradorForm.get('fechaNacimiento').errors ? this.serCompradorForm.get('fechaNacimiento').errors.fechaAnteriorAHoy && this.serCompradorForm.get('fechaNacimiento').touched : null
  }

  get emailNoValido(){
    return this.emailRequerido || this.emailFormatoNoValido
  }
  get emailRequerido(){
    return this.serCompradorForm.get('email').errors ? this.serCompradorForm.get('email').errors.required && this.serCompradorForm.get('email').touched : null
  }
  get emailFormatoNoValido(){
    return this.serCompradorForm.get('email').errors ? this.serCompradorForm.get('email').errors.email && this.serCompradorForm.get('email').touched : null
  }

  get passwordNoValido(){
    return this.passwordRequerido
  }
  get passwordRequerido(){
    return this.serCompradorForm.get('password').errors ? this.serCompradorForm.get('password').errors.required && this.serCompradorForm.get('password').touched : null
  }
  get passwordRequerido2(){
    return this.serCompradorForm.get('password2').errors ? this.serCompradorForm.get('password2').errors.required && this.serCompradorForm.get('password2').touched : null
  }


}
