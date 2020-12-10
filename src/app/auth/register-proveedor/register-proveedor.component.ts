import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    autonomo:['', Validators.required],
    email:['',[ Validators.required, Validators.email] ],
    password:['', Validators.required],
    password2:['', Validators.required],
    sector:['', Validators.required],
    registroMercantil:[''],
    nif:[''],
    direccion:['',[ Validators.required] ],
    cuentaBancariaIBAN:['',[ Validators.required] ],
    titularCuenta:['',[ Validators.required] ],
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
    let sectores = this.registrarProveedorForm.value["sector"];
    this.registrarProveedorForm.value["sector"] =  sectores.split(",");
    console.log( this.registrarProveedorForm.value);
    this.registrarProveedorForm.value

    if(this.registrarProveedorForm.invalid){
      console.log("invalido")
      return;
    }

    if(this.autonomo){
      delete this.registrarProveedorForm.value["registroMercantil"];
    }else delete this.registrarProveedorForm.value["nif"];

    this.usuarioService.crearProveedor(this.registrarProveedorForm.value).subscribe( resp => {
      this.router.navigateByUrl('/');
      }, (err)=> {
        Swal.fire('Error', err.error.msg, 'error');
      });
    }

  campoNoValido (campo:string) :boolean{
    if(this.registrarProveedorForm.get(campo).invalid && this.formSubmited){
      return true;
    }else{
      return false;
    }
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
}
