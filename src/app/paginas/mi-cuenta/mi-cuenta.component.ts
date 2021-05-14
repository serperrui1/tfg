import { Component, OnInit } from '@angular/core';
import { AsistenteTecnico } from '../../models/asistente';
import { Administrador } from '../../models/administrador';
import { Comprador } from '../../models/comprador';
import { Proveedor } from '../../models/proveedor';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  public aT: AsistenteTecnico;
  public admin: Administrador;
  public comp: Comprador;
  public prov: Proveedor;
  comprador = localStorage.getItem("usuario") === "comprador"

  constructor(private usuarioService: UsuarioService,
    private router:Router) { }

  async ngOnInit() {
    this.admin = await this.usuarioService.getAdministrador();
    if(this.admin === null){
      this.aT = await this.usuarioService.getAsistenteTecnico();
      if(this.aT === null){
        this.comp = await this.usuarioService.getComprador();
        if(this.comp === null){
          this.prov = await this.usuarioService.getProveedor();
        }
      }
    }
  }

  borrarCuenta(){
    Swal.fire({
      title: 'Vas a borrar tu cuenta y todos tus datos asociados.',
      text: '¿Estás seguro?',
      showCancelButton: true,
      confirmButtonText: `Sí`, 
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.prov){
          this.usuarioService.borrarMiCuentaProveedor(this.prov.uid)
          .subscribe( resp => {
            Swal.fire( 'Borrado', 'Cuenta eliminada.', 'success' );
            this.usuarioService.logout();
            this.router.navigateByUrl('/login');
          }, (err) => {
            Swal.fire('Error', 'Ha habido un problema.', 'error');
          });
        }else if (this.comp){
          this.usuarioService.borrarMiCuentaComprador(this.comp.uid)
          .subscribe( resp => {
            Swal.fire( 'Borrado', 'Cuenta eliminada.', 'success' );
            this.usuarioService.logout();
            this.router.navigateByUrl('/login');
          }, (err) => {
            Swal.fire('Error', 'Ha habido un problema.', 'error');
          });
        }
      } 
    })
  }

  
  
}


