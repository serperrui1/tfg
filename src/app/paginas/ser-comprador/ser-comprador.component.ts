import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proveedor } from '../../models/proveedor';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ser-comprador',
  templateUrl: './ser-comprador.component.html',
  styles: [
  ]
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
      this.usuario =localStorage.getItem('usuario') || "";
    }

  async ngOnInit() {
    this.emailDB = await this.usuarioService.getCompradorEmail(this.proveedor.email);
    this.compruebaYaSoyComprador();

    if(this.usuario === "proveedor"){
    this.proveedor = await this.usuarioService.getProveedor();
   
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
      direccionResidencia: [ '', Validators.required ],
      terminos:['', Validators.required]

      }, {
        validators: this.passwordsIguales('password', 'password2')
      });
    }

    
  }

  crearComprador(){
    this.formSubmited = true;
    console.log(this.serCompradorForm.value);

    if(this.serCompradorForm.invalid){
      return;
    }

    this.usuarioService.crearComprador(this.serCompradorForm.value).subscribe( resp => {
      this.router.navigateByUrl('/');
      }, (err)=> {
        Swal.fire('Error', err.error.msg, 'error');
      });
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
    if(this.proveedor.email === this.emailDB){
      this.yaSoyComprador = true;
      console.log(this.yaSoyComprador);
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


}
