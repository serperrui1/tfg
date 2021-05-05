import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-proveedor',
  templateUrl: './register-proveedor.component.html',
  styleUrls: ['./register-proveedor.component.css']
})
export class RegisterProveedorComponent {

  formSubmited:boolean = false;
  autonomo:boolean = false;
  
  public registrarProveedorForm = this.fb.group({
    nombreEmpresa:['', Validators.required],
    autonomo:[false ,Validators.required],
    email:['',[ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')] ],
    password:['', [Validators.required, this.passwordFormatoNoValido]],
    password2:['', Validators.required],
    sector:['Libros, Música, Vídeo y DVD'],
    registroMercantil:['',[ , Validators.pattern('^[A-Z]{1}[-][0-9]{8}$')] ],
    nif:['',[ , Validators.pattern('^[0-9]{8}[A-Z]{1}$')] ],
    direccion:['',[ Validators.required] ],
    cuentaBancariaIBAN:['',[ Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{22}$')] ],
    titularCuenta:['',[ Validators.required, Validators.pattern('^[A-Z \d\W]+$')]],
    terminos:['',[ Validators.required] ]

  },{
    validators: this.passwordsIguales('password', 'password2')
  })

  constructor(private fb:FormBuilder,
              private usuarioService: UsuarioService,
              private router:Router) {

   }

  crearProveedor(){
    this.formSubmited = true;

    if(this.registrarProveedorForm.invalid){
      this.registrarProveedorForm.markAllAsTouched()
      return;
    }

    if(this.autonomo){
      delete this.registrarProveedorForm.value["registroMercantil"];
    }else delete this.registrarProveedorForm.value["nif"];

    this.usuarioService.crearProveedor(this.registrarProveedorForm.value).subscribe( resp => {
      Swal.fire('Guardado', 'Proveedor registrado correctamente', 'success');
      this.router.navigateByUrl('/login');
      }, (err)=> {
        Swal.fire('Error', err.error.msg, 'error');
      });
    }

  
  

  aceptaTerminos(){
    return !this.registrarProveedorForm.get('terminos').value && this.formSubmited;
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


  campoNoValido (campo:string) :boolean{
    if(this.registrarProveedorForm.get(campo).invalid && this.formSubmited){
      return true;
    }else{
      return false;
    }
  }


  get emailNoValido(){
    return this.emailRequerido || this.emailFormatoNoValido
  }
  get emailRequerido(){
    return this.registrarProveedorForm.get('email').errors ? this.registrarProveedorForm.get('email').errors.required && this.registrarProveedorForm.get('email').touched : null
  }
  get emailFormatoNoValido(){
    return this.registrarProveedorForm.get('email').errors ? this.registrarProveedorForm.get('email').errors.pattern && this.registrarProveedorForm.get('email').touched : null
  }


  get passwordNoValido(){
    return this.passwordRequerido || this.passwordRequerido2 || this.passwordFormato
  }
  get passwordRequerido(){
    return this.registrarProveedorForm.get('password').errors ? this.registrarProveedorForm.get('password').errors.required && this.registrarProveedorForm.get('password').touched : null
  }
  get passwordRequerido2(){
    return this.registrarProveedorForm.get('password2').errors ? this.registrarProveedorForm.get('password2').errors.required && this.registrarProveedorForm.get('password2').touched : null
  }
  get passwordFormato(){
    return this.registrarProveedorForm.get('password').errors ? this.registrarProveedorForm.get('password').errors.passwordFormatoNoValido && this.registrarProveedorForm.get('password').touched : null
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
  contrasenasNoValidas(){
    const pass1 = this.registrarProveedorForm.get('password').value;
    const pass2 = this.registrarProveedorForm.get('password2').value;

    if(((pass1!==pass2) && this.formSubmited)|| ((pass1=="" ||pass2=="") && this.formSubmited)){
      return true;
    }else{
      return false;
    }
  }
  



  get cuentaBancariaIbanNoValido(){
    return this.cuentaBancariaIBANRequerido || this.cuentaBancariaFormato
  }
  get cuentaBancariaIBANRequerido(){
    return this.registrarProveedorForm.get('cuentaBancariaIBAN').errors ? this.registrarProveedorForm.get('cuentaBancariaIBAN').errors.required && this.registrarProveedorForm.get('cuentaBancariaIBAN').touched : null
  }
  get cuentaBancariaFormato(){
    return this.registrarProveedorForm.get('cuentaBancariaIBAN').errors ? this.registrarProveedorForm.get('cuentaBancariaIBAN').errors.pattern && this.registrarProveedorForm.get('cuentaBancariaIBAN').touched : null
  }



  get titularFormato(){
    return this.registrarProveedorForm.get('titularCuenta').errors ? this.registrarProveedorForm.get('titularCuenta').errors.pattern && this.registrarProveedorForm.get('titularCuenta').touched : null
  }



  get cifFormato(){
    return this.registrarProveedorForm.get('registroMercantil').errors ? this.registrarProveedorForm.get('registroMercantil').errors.pattern && this.registrarProveedorForm.get('registroMercantil').touched : null
  }
  get nifFormato(){
    return this.registrarProveedorForm.get('nif').errors ? this.registrarProveedorForm.get('nif').errors.pattern && this.registrarProveedorForm.get('nif').touched : null
  }
}
