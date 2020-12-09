import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent {


  constructor(private usuarioService: UsuarioService) { }
  logout(){
    this.usuarioService.logout();
  }

}
