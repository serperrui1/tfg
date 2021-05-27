import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
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
          email:['',[ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')] ],
          password:['', [Validators.required, this.passwordFormatoNoValido]],
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
      this.registrarAsistenteForm.markAllAsTouched()
      return;
    }

    this.registrarAsistenteForm.controls['nombre'].setValue(this.registrarAsistenteForm.controls['nombre'].value.trim());
    this.registrarAsistenteForm.controls['apellidos'].setValue(this.registrarAsistenteForm.controls['apellidos'].value.trim());
    
    this.usuarioService.crearAsistenteTecnico(this.registrarAsistenteForm.value).subscribe( resp => {
      Swal.fire('Guardado', 'Asistente técnico registrado correctamente', 'success');
      this.router.navigateByUrl('/login/empleado');
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




  get emailNoValido(){
    return this.emailRequerido || this.emailFormatoNoValido
  }
  get emailRequerido(){
    return this.registrarAsistenteForm.get('email').errors ? this.registrarAsistenteForm.get('email').errors.required && this.registrarAsistenteForm.get('email').touched : null
  }
  get emailFormatoNoValido(){
    return this.registrarAsistenteForm.get('email').errors ? this.registrarAsistenteForm.get('email').errors.pattern && this.registrarAsistenteForm.get('email').touched : null
  }




  get passwordNoValido(){
    return this.passwordRequerido || this.passwordRequerido2 || this.passwordFormato
  }
  get passwordRequerido(){
    return this.registrarAsistenteForm.get('password').errors ? this.registrarAsistenteForm.get('password').errors.required && this.registrarAsistenteForm.get('password').touched : null
  }
  get passwordRequerido2(){
    return this.registrarAsistenteForm.get('password2').errors ? this.registrarAsistenteForm.get('password2').errors.required && this.registrarAsistenteForm.get('password2').touched : null
  }
  get passwordFormato(){
    return this.registrarAsistenteForm.get('password').errors ? this.registrarAsistenteForm.get('password').errors.passwordFormatoNoValido && this.registrarAsistenteForm.get('password').touched : null
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



}
