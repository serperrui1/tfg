import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { Administrador } from '../../models/administrador';

@Component({
  selector: 'app-register-asistente-tecnico',
  templateUrl: './register-asistente-tecnico.component.html',
  styleUrls: ['./register-asistente-tecnico.component.css']
})
export class RegisterAsistenteTecnicoComponent {

  formSubmited:boolean = false;
  public admin: Administrador;
  public registrarAsistenteForm: FormGroup;
  

  constructor(private fb:FormBuilder,
    private usuarioService: UsuarioService,
    private router:Router) {
  }
 
  async ngOnInit() {
    this.admin = await this.usuarioService.getAdministrador();
      if(this.admin != null){
        this.registrarAsistenteForm = this.fb.group({
          nombre:['', Validators.required],
          apellidos:['', Validators.required],
          email:['',[ Validators.required, Validators.email] ],
          password:['', Validators.required],
          password2:['', Validators.required],
          terminos:['', Validators.required]
        },{
          validators: this.passwordsIguales('password', 'password2')
        })
      }
  }

  crearAsistente(){
    this.formSubmited = true;
    if(this.registrarAsistenteForm.invalid){
      return;
    }
    this.usuarioService.crearAsistenteTecnico(this.registrarAsistenteForm.value).subscribe( resp => {
      this.router.navigateByUrl('/');
      }, (err)=> {
        Swal.fire('Error', err.error.msg, 'error');
      });
    }

  campoNoValido (campo:string) :boolean{
    if(this.registrarAsistenteForm.get(campo).invalid && this.formSubmited){
      return true;
    }else{
      return false;
    }
  }

  contrasenasNoValidas(){
    const pass1 = this.registrarAsistenteForm.get('password').value;
    const pass2 = this.registrarAsistenteForm.get('password2').value;
    if(((pass1!==pass2) && this.formSubmited)|| ((pass1=="" ||pass2=="") && this.formSubmited)){
      return true;
    }else{
      return false;
    }
  }

  aceptaTerminos(){
    return !this.registrarAsistenteForm.get('terminos').value && this.formSubmited;
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
