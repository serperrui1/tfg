import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit{

  public cuant:number[] = [];
  public temp:number = 0;
  public res:number = 0;
  public flag:number = 0;
  public existeTokenYProveedor= false;
  
  constructor(private usuarioService: UsuarioService, 
    private carritoService: CarritoService) { 
      this.proveedor();
  }
  
  async ngOnInit() {
  
    /* this.notifi(); */
    this.notifica();

  }

  /* notifi(){
    this.cuant = this.carritoService.getCantidades();
      for (let i = 0; i < this.cuant.length; i++) {

        if (this.temp === 0 && this.res === 0){ //primera vez y flag = 0
          this.temp = this.temp + this.cuant[i].valueOf();
        }

        if (this.temp != 0 && this.res != 0){
          this.flag = 1;
          this.temp = this.temp + this.cuant[i].valueOf();
        }

      }

      if(this.flag === 0){ // devolvemos primer valor
        this.res = this.temp;
      }

      if(this.flag === 1){ 
        this.res = this.temp - this.res;
      }
      

  } */

  notifica(){
    this.cuant = this.carritoService.getCantidades();
    for (let i = 0; i < this.cuant.length; i++) {
      this.temp = this.temp + this.cuant[i].valueOf();
    }
    this.res = this.temp;

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cuant']) {
        // Do your logic here
        /* this.notifi() */
        this.notifica();
    }
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
