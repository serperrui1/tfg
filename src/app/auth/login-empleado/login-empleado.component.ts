import { Component, NgZone, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi:any;
@Component({
  selector: 'app-login-empleado',
  templateUrl: './login-empleado.component.html',
  styleUrls: ['./login-empleado.component.css' ]
})
export class LoginEmpleadoComponent implements OnInit{

  formSubmited:boolean = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email:[localStorage.getItem('email') ||'',[ Validators.required, Validators.email] ],
    password:['', Validators.required],
    remember:[false],
    usuario:['administrador', Validators.required],
  });

  constructor(  private router: Router,
   private fb: FormBuilder,
   private usuarioService: UsuarioService,
   private ngZone: NgZone){}

   ngOnInit(): void {
  }

   login() {
  
    this.usuarioService.login(this.loginForm.value).subscribe(resp=>{ 
      if( this.loginForm.get('remember').value){
        localStorage.setItem('email',this.loginForm.get('email').value);
      }else{
        localStorage.removeItem('email');
      }
      localStorage.setItem('usuario', this.loginForm.get('usuario').value)
      // Navegar al Dashboard
      this.router.navigateByUrl('/');
      
      }, (err)=> {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  get emailRequerido(){
    return this.loginForm.get('email').invalid && this.loginForm.get('email').touched
  }

  get passwordRequerido(){
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched
  }

}
