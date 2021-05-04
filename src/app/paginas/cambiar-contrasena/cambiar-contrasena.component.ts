import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {

  formSubmited:boolean = false;

  public contrasenaForm = this.fb.group({

    password:['', [Validators.required, this.passwordFormatoNoValido]],
    nuevaPassword:['', [Validators.required, this.passwordFormatoNoValido]],
    nuevaPassword2:['', [Validators.required,]],
    
  },{
    validators: this.passwordsIguales('nuevaPassword', 'nuevaPassword2')
  })
  

  constructor(private usuarioService: UsuarioService, 
    private fb:FormBuilder,
    private router:Router) { }

  ngOnInit(){

   
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
  

  cambiarContrasena(){
    this.formSubmited = true;

    if(this.contrasenaForm.invalid){
      this.contrasenaForm.markAllAsTouched()
      return;
    }

    this.usuarioService.actualizarContrasena(this.contrasenaForm.value).subscribe( resp => {
      Swal.fire('Guardado', 'Contraseña actualizada correctamente', 'success');
      this.router.navigateByUrl('/login');
      }, (err)=> {
        Swal.fire('Error', err.error.msg, 'error');
      });

    }




    //Validaciones
    get passwordNoValido(){
      return this.passwordRequerido || this.nuevaPassRequerida || this.nuevaPass2Requerida || this.passwordFormato || this.nuevaPassFormato
    }
    get passwordRequerido(){
      return this.contrasenaForm.get('password').errors ? this.contrasenaForm.get('password').errors.required && this.contrasenaForm.get('password').touched : null
    }
    get nuevaPassRequerida(){
      return this.contrasenaForm.get('nuevaPassword').errors ? this.contrasenaForm.get('nuevaPassword').errors.required && this.contrasenaForm.get('nuevaPassword').touched : null
    }
    get nuevaPass2Requerida(){
      return this.contrasenaForm.get('nuevaPassword2').errors ? this.contrasenaForm.get('nuevaPassword2').errors.required && this.contrasenaForm.get('nuevaPassword2').touched : null
    }
    get passwordFormato(){
      return this.contrasenaForm.get('password').errors ? this.contrasenaForm.get('password').errors.passwordFormatoNoValido && this.contrasenaForm.get('password').touched : null
    }
    get nuevaPassFormato(){
      return this.contrasenaForm.get('nuevaPassword').errors ? this.contrasenaForm.get('nuevaPassword').errors.passwordFormatoNoValido && this.contrasenaForm.get('nuevaPassword').touched : null
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
      const pass1 = this.contrasenaForm.get('nuevaPassword').value;
      const pass2 = this.contrasenaForm.get('nuevaPassword2').value;
  
      if(((pass1!==pass2) && this.formSubmited)|| ((pass1=="" ||pass2=="") && this.formSubmited)){
        return true;
      }else{
        return false;
      }
    }

}
