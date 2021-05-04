import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
      email:[this.proveedor.email,/* [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]  */],
      password:['', [Validators.required, this.passwordFormatoNoValido]],
      password2:['', Validators.required],
      numeroTelefono: ['', [Validators.required, this.telefonoFormatoNoValido]],
      fechaNacimiento:['', [ Validators.required, this.fechaAnteriorAHoy]],
      paisResidencia: [ '', Validators.required ],
      ciudad: [ '', Validators.required ],
      localidad: [ '', Validators.required ],
      codigoPostal:['',[ Validators.required, this.codigoPostalFormatoNoValido] ],
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


  aceptaTerminos(){
    return !this.serCompradorForm.get('terminos').value && this.formSubmited;
  }

  compruebaYaSoyComprador(){
    if(this.emailDB != ""){
      this.yaSoyComprador = true;
      Swal.fire('Error', "Ya existe una cuenta de comprador con ese email." , 'error');
      this.router.navigateByUrl('/login');

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
  campoNoValido (campo:string) :boolean{
    if(this.serCompradorForm.get(campo).invalid && this.formSubmited){
      return true;
    }else{
      return false;
    }
  }


  get nombreNoValido(){
    return this.nombreRequerido
  }
  get nombreRequerido(){
    return this.serCompradorForm.get('nombre').errors ? this.serCompradorForm.get('nombre').errors.required && this.serCompradorForm.get('nombre').touched : null
  }

  get apellidosNoValido(){
    return this.apellidosRequerido
  }
  get apellidosRequerido(){
    return this.serCompradorForm.get('apellidos').errors ? this.serCompradorForm.get('apellidos').errors.required && this.serCompradorForm.get('apellidos').touched : null
  }

  get direccionCompradorRequerido(){
    return this.serCompradorForm.get('direccionResidencia').errors ? this.serCompradorForm.get('direccionResidencia').errors.required && this.serCompradorForm.get('direccionResidencia').touched : null
  }
  get direccionCompradorNoValido(){
    return this.direccionCompradorRequerido
  }

  get ciudadCompradorRequerido(){
    return this.serCompradorForm.get('ciudad').errors ? this.serCompradorForm.get('ciudad').errors.required && this.serCompradorForm.get('ciudad').touched : null
  }
  get ciudadCompradorNoValido(){
    return this.ciudadCompradorRequerido
  }

  get localidadCompradorRequerido(){
    return this.serCompradorForm.get('localidad').errors ? this.serCompradorForm.get('localidad').errors.required && this.serCompradorForm.get('localidad').touched : null
  }
  get localidadCompradorNoValido(){
    return this.localidadCompradorRequerido
  }

  get paisCompradorRequerido(){
    return this.serCompradorForm.get('paisResidencia').errors ? this.serCompradorForm.get('paisResidencia').errors.required && this.serCompradorForm.get('paisResidencia').touched : null
  }
  get paisCompradorNoValido(){
    return this.paisCompradorRequerido
  }






  get fechaNoValido(){
    return this.fechaNacimientoRequerido || this.fechaFechaAnteriorAHoy
  }
  get fechaNacimientoRequerido(){
    return this.serCompradorForm.get('fechaNacimiento').errors ? this.serCompradorForm.get('fechaNacimiento').errors.required && this.serCompradorForm.get('fechaNacimiento').touched : null
  }
  get fechaFechaAnteriorAHoy(){
    return this.serCompradorForm.get('fechaNacimiento').errors ? this.serCompradorForm.get('fechaNacimiento').errors.fechaAnteriorAHoy && this.serCompradorForm.get('fechaNacimiento').touched : null
  }


  get codigoPostalCompradorNoValido(){
    return this.codigoPostalCompradorRequerido || this.codigoPostalFormato
  }
  get codigoPostalCompradorRequerido(){
    return this.serCompradorForm.get('codigoPostal').errors ? this.serCompradorForm.get('codigoPostal').errors.required && this.serCompradorForm.get('codigoPostal').touched : null
  }
  get codigoPostalFormato(){
    return this.serCompradorForm.get('codigoPostal').errors ? this.serCompradorForm.get('codigoPostal').errors.codigoPostalFormatoNoValido && this.serCompradorForm.get('codigoPostal').touched : null
  }


  get tlfCompradorNoValido(){
    return this.tlfCompradorRequerido || this.telefonoFormato
  }
  get tlfCompradorRequerido(){
    return this.serCompradorForm.get('numeroTelefono').errors ? this.serCompradorForm.get('numeroTelefono').errors.required && this.serCompradorForm.get('numeroTelefono').touched : null
  }
  get telefonoFormato(){
    return this.serCompradorForm.get('numeroTelefono').errors ? this.serCompradorForm.get('numeroTelefono').errors.telefonoFormatoNoValido && this.serCompradorForm.get('numeroTelefono').touched : null
  }


  get passwordNoValido(){
    return this.passwordRequerido || this.passwordRequerido2 || this.passwordFormato
  }
  get passwordRequerido(){
    return this.serCompradorForm.get('password').errors ? this.serCompradorForm.get('password').errors.required && this.serCompradorForm.get('password').touched : null
  }
  get passwordRequerido2(){
    return this.serCompradorForm.get('password2').errors ? this.serCompradorForm.get('password2').errors.required && this.serCompradorForm.get('password2').touched : null
  }
  get passwordFormato(){
    return this.serCompradorForm.get('password').errors ? this.serCompradorForm.get('password').errors.passwordFormatoNoValido && this.serCompradorForm.get('password').touched : null
  }



  /* get emailNoValido(){
    return this.emailRequerido || this.emailFormatoNoValido
  }
  get emailRequerido(){
    return this.serCompradorForm.get('email').errors ? this.serCompradorForm.get('email').errors.required && this.serCompradorForm.get('email').touched : null
  }
  get emailFormatoNoValido(){
    return this.serCompradorForm.get('email').errors ? this.serCompradorForm.get('email').errors.pattern && this.serCompradorForm.get('email').touched : null
  } */
  
  

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


  contrasenasNoValidas(){
    const pass1 = this.serCompradorForm.get('password').value;
    const pass2 = this.serCompradorForm.get('password2').value;

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
