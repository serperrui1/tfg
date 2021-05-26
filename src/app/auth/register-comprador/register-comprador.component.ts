import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-comprador',
  templateUrl: './register-comprador.component.html',
  styleUrls: ['./register-comprador.component.css']
})
export class RegisterCompradorComponent {

  formSubmited:boolean = false;
  /* emailUsado=false; */
 
  
  public registrarCompradorForm = this.fb.group({
    nombre:['', Validators.required],
    apellidos:['', Validators.required],
    email:['',[ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')] ],
    password:['', [Validators.required, this.passwordFormatoNoValido]],
    password2:['', [Validators.required, /* this.passwordsNoCoinciden */]],
    numeroTelefono: ['', [Validators.required, this.telefonoFormatoNoValido]],
    fechaNacimiento:['', [ Validators.required, this.fechaAnteriorAHoy]],
    paisResidencia:['',[ Validators.required] ],
    ciudad:['',[ Validators.required] ],
    localidad:['',[ Validators.required] ],
    direccionResidencia:['',[ Validators.required] ],
    codigoPostal:['',[ Validators.required, this.codigoPostalFormatoNoValido] ],
    terminos:['', Validators.required]
  },{
    validators: this.passwordsIguales('password', 'password2')
  })

  constructor(private fb:FormBuilder,
              private usuarioService: UsuarioService,
              private router:Router) {

   }

  crearComprador(){
    this.formSubmited = true;


    /* if(this.emailUsado){
      Swal.fire('Error', 'Ya existe un comprador con ese email', 'error');
    } */

    if(this.registrarCompradorForm.invalid){
      this.registrarCompradorForm.markAllAsTouched()
      return;
    }
    /* this.message = this.chatForm.controls['mensajes'].value; */
    this.registrarCompradorForm.controls['nombre'].setValue(this.registrarCompradorForm.controls['nombre'].value.trim());
    this.registrarCompradorForm.controls['apellidos'].setValue(this.registrarCompradorForm.controls['apellidos'].value.trim());
    this.registrarCompradorForm.controls['paisResidencia'].setValue(this.registrarCompradorForm.controls['paisResidencia'].value.trim());
    this.registrarCompradorForm.controls['ciudad'].setValue(this.registrarCompradorForm.controls['ciudad'].value.trim());
    this.registrarCompradorForm.controls['localidad'].setValue(this.registrarCompradorForm.controls['localidad'].value.trim());
    this.registrarCompradorForm.controls['direccionResidencia'].setValue(this.registrarCompradorForm.controls['direccionResidencia'].value.trim());
    
    this.usuarioService.crearComprador(this.registrarCompradorForm.value).subscribe( resp => {
      Swal.fire('Guardado', 'Comprador registrado correctamente', 'success');
      this.router.navigateByUrl('/login/empleado');
      }, (err)=> {
        Swal.fire('Error', err.error.msg, 'error');
      });
    }

  campoNoValido (campo:string) :boolean{
    if(this.registrarCompradorForm.get(campo).invalid && this.formSubmited){
      return true;
    }else{
      return false;
    }
  }
  

  aceptaTerminos(){
    return !this.registrarCompradorForm.get('terminos').value && this.formSubmited;
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
  get direccionCompradorRequerido(){
    return this.registrarCompradorForm.get('direccionResidencia').errors ? this.registrarCompradorForm.get('direccionResidencia').errors.required && this.registrarCompradorForm.get('direccionResidencia').touched : null
  }
  get direccionCompradorNoValido(){
    return this.direccionCompradorRequerido
  }

  get ciudadCompradorRequerido(){
    return this.registrarCompradorForm.get('ciudad').errors ? this.registrarCompradorForm.get('ciudad').errors.required && this.registrarCompradorForm.get('ciudad').touched : null
  }
  get ciudadCompradorNoValido(){
    return this.ciudadCompradorRequerido
  }

  get localidadCompradorRequerido(){
    return this.registrarCompradorForm.get('localidad').errors ? this.registrarCompradorForm.get('localidad').errors.required && this.registrarCompradorForm.get('localidad').touched : null
  }
  get localidadCompradorNoValido(){
    return this.localidadCompradorRequerido
  }

  get paisCompradorRequerido(){
    return this.registrarCompradorForm.get('paisResidencia').errors ? this.registrarCompradorForm.get('paisResidencia').errors.required && this.registrarCompradorForm.get('paisResidencia').touched : null
  }
  get paisCompradorNoValido(){
    return this.paisCompradorRequerido
  }


  get fechaNoValido(){
    return this.fechaNacimientoRequerido || this.fechaFechaAnteriorAHoy
  }
  get fechaNacimientoRequerido(){
    return this.registrarCompradorForm.get('fechaNacimiento').errors ? this.registrarCompradorForm.get('fechaNacimiento').errors.required && this.registrarCompradorForm.get('fechaNacimiento').touched : null
  }
  get fechaFechaAnteriorAHoy(){
    return this.registrarCompradorForm.get('fechaNacimiento').errors ? this.registrarCompradorForm.get('fechaNacimiento').errors.fechaAnteriorAHoy && this.registrarCompradorForm.get('fechaNacimiento').touched : null
  }


  get codigoPostalCompradorNoValido(){
    return this.codigoPostalCompradorRequerido || this.codigoPostalFormato
  }
  get codigoPostalCompradorRequerido(){
    return this.registrarCompradorForm.get('codigoPostal').errors ? this.registrarCompradorForm.get('codigoPostal').errors.required && this.registrarCompradorForm.get('codigoPostal').touched : null
  }
  get codigoPostalFormato(){
    return this.registrarCompradorForm.get('codigoPostal').errors ? this.registrarCompradorForm.get('codigoPostal').errors.codigoPostalFormatoNoValido && this.registrarCompradorForm.get('codigoPostal').touched : null
  }


  get tlfCompradorNoValido(){
    return this.tlfCompradorRequerido || this.telefonoFormato
  }
  get tlfCompradorRequerido(){
    return this.registrarCompradorForm.get('numeroTelefono').errors ? this.registrarCompradorForm.get('numeroTelefono').errors.required && this.registrarCompradorForm.get('numeroTelefono').touched : null
  }
  get telefonoFormato(){
    return this.registrarCompradorForm.get('numeroTelefono').errors ? this.registrarCompradorForm.get('numeroTelefono').errors.telefonoFormatoNoValido && this.registrarCompradorForm.get('numeroTelefono').touched : null
  }


  get passwordNoValido(){
    return this.passwordRequerido || this.passwordRequerido2 || this.passwordFormato
  }
  get passwordRequerido(){
    return this.registrarCompradorForm.get('password').errors ? this.registrarCompradorForm.get('password').errors.required && this.registrarCompradorForm.get('password').touched : null
  }
  get passwordRequerido2(){
    return this.registrarCompradorForm.get('password2').errors ? this.registrarCompradorForm.get('password2').errors.required && this.registrarCompradorForm.get('password2').touched : null
  }
  get passwordFormato(){
    return this.registrarCompradorForm.get('password').errors ? this.registrarCompradorForm.get('password').errors.passwordFormatoNoValido && this.registrarCompradorForm.get('password').touched : null
  }
  /* get passwordsNoIguales(){
    return this.registrarCompradorForm.get('password2').errors ? this.registrarCompradorForm.get('password2').errors.passwordsNoCoinciden && this.registrarCompradorForm.get('password2').touched : null
  } */


  get emailNoValido(){
    return this.emailRequerido || this.emailFormatoNoValido
  }
  get emailRequerido(){
    return this.registrarCompradorForm.get('email').errors ? this.registrarCompradorForm.get('email').errors.required && this.registrarCompradorForm.get('email').touched : null
  }
  get emailFormatoNoValido(){
    return this.registrarCompradorForm.get('email').errors ? this.registrarCompradorForm.get('email').errors.pattern && this.registrarCompradorForm.get('email').touched : null
  }
  
  

  //Validaciones personalizadas
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

  /* async emailEnUso(){
    let f = this.registrarCompradorForm.get('email').value;
    let x = await this.usuarioService.getCompradorEmail(f);
    if (x.length != 0){
      this.emailUsado = true;
    } else {
      this.emailUsado = false;
    }
  } */

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

  private passwordFormatoNoValido(control:FormControl):{[s:string]:boolean}{
    let cP = String(control.value);
    if(cP.length < 4 || cP.length > 16){
      return {
        passwordFormatoNoValido:true
      }
    }
    return null
  }

  /* private passwordsNoCoinciden(control:FormControl):{[s:string]:boolean}{
    let pass2 = String(control.value);
    let pass1 = String((document.getElementById("password") as HTMLInputElement).value);
    console.log(pass1)
    if(pass2 != pass1){
      return {
        passwordsNoCoinciden:true
      }
    }
    return null
  } */

  contrasenasNoValidas(){
    const pass1 = this.registrarCompradorForm.get('password').value;
    const pass2 = this.registrarCompradorForm.get('password2').value;

    if(((pass1!==pass2) && this.formSubmited)|| ((pass1=="" ||pass2=="") && this.formSubmited)){
      return true;
    }else{
      return false;
    }
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
