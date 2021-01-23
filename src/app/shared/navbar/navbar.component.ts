import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'
  ]
})
export class NavbarComponent {

  public existeTokenYProveedor= false;
  constructor(private fb:FormBuilder,
    private usuarioService: UsuarioService,
    private router:Router) { 
      this.proveedor();
  }
  public buscadorForm = this.fb.group({
   
    producto:['']
  })
  
  logout(){
    this.usuarioService.logout();
  }

  proveedor(){
    if(localStorage.getItem('usuario')==="proveedor" && localStorage.getItem('token')){
      this.existeTokenYProveedor=true;
    }
  }

  buscarProducto( ){
    this.router.navigate( ['/buscador',this.buscadorForm.value['producto']] );
  }
}
