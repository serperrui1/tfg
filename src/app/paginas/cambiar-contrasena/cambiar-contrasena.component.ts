import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    password:['', Validators.required],
    nuevaPassword:['', Validators.required],
    nuevaPassword2:['', Validators.required],
    
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
  contrasenasNoValidas(){
    const pass1 = this.contrasenaForm.get('nuevaPassword').value;
    const pass2 = this.contrasenaForm.get('nuevaPassword2').value;

    if(((pass1!==pass2) && this.formSubmited)|| ((pass1=="" ||pass2=="") && this.formSubmited)){
      return true;
    }else{
      return false;
    }
  }

  cambiarContrasena(){
    this.formSubmited = true;
    console.log(this.contrasenaForm.value);

    if(this.contrasenaForm.invalid){
      return;
    }

    this.usuarioService.actualizarContrasena(this.contrasenaForm.value).subscribe( resp => {
      this.router.navigateByUrl('/');
      }, (err)=> {
        Swal.fire('Error', err.error.msg, 'error');
      });
    }

    //Validaciones
  get contrasenaNoValido(){
    return this.contrasenaCampoRequerido
  }
  get contrasenaCampoRequerido(){
    return this.contrasenaForm.get('password').errors ? this.contrasenaForm.get('password').errors.required && this.contrasenaForm.get('password').touched : null
  }
  get nuevaContrasenaNoValido(){
    return this.nuevaContrasenaCampoRequerido
  }
  get nuevaContrasenaCampoRequerido(){
    return this.contrasenaForm.get('nuevaPassword').errors ? this.contrasenaForm.get('nuevaPassword').errors.required && this.contrasenaForm.get('nuevaPassword').touched : null
  }
  get repitaNuevaNoValido(){
    return this.repitaNuevaCampoRequerido
  }
  get repitaNuevaCampoRequerido(){
    return this.contrasenaForm.get('nuevaPassword2').errors ? this.contrasenaForm.get('nuevaPassword2').errors.required && this.contrasenaForm.get('nuevaPassword2').touched : null
  }

}
