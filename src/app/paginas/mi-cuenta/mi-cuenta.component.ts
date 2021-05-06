import { Component, OnInit } from '@angular/core';
import { AsistenteTecnico } from '../../models/asistente';
import { Administrador } from '../../models/administrador';
import { Comprador } from '../../models/comprador';
import { Proveedor } from '../../models/proveedor';
import { UsuarioService } from '../../services/usuario.service';

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

  constructor(private usuarioService: UsuarioService) { }

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

  
}


