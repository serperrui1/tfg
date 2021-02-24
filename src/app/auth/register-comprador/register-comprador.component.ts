import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
 
  
  public registrarCompradorForm = this.fb.group({
    nombre:['', Validators.required],
    apellidos:['', Validators.required],
    email:['',[ Validators.required, Validators.email] ],
    password:['', Validators.required],
    password2:['', Validators.required],
    fechaNacimiento:['', Validators.required],
    nacionalidad:['',[ Validators.required] ],
    paisResidencia:['',[ Validators.required] ],
    ciudad:['',[ Validators.required] ],
    localidad:['',[ Validators.required] ],
    direccionResidencia:['',[ Validators.required] ],
    codigoPostal:['',[ Validators.required] ],
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
    console.log(this.registrarCompradorForm.value);

    if(this.registrarCompradorForm.invalid){
      return;
    }

    this.usuarioService.crearComprador(this.registrarCompradorForm.value).subscribe( resp => {
      this.router.navigateByUrl('/');
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
  contrasenasNoValidas(){
    const pass1 = this.registrarCompradorForm.get('password').value;
    const pass2 = this.registrarCompradorForm.get('password2').value;

    if(((pass1!==pass2) && this.formSubmited)|| ((pass1=="" ||pass2=="") && this.formSubmited)){
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
}
