import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent {

  public existeTokenYProveedor= false;
  constructor(private usuarioService: UsuarioService) { 
      this.proveedor();

  }
  logout(){
    this.usuarioService.logout();
  }

  proveedor(){
    if(localStorage.getItem('usuario')==="proveedor" && localStorage.getItem('token')){
      this.existeTokenYProveedor=true;
    }
  }

  
}
