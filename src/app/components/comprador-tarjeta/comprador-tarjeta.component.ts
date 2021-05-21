import { Component, OnInit, Input } from '@angular/core';
import { Comprador } from '../../models/comprador';
import { Administrador } from '../../models/administrador';
import { environment } from 'src/environments/environment';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

const base_url = environment.base_url;

@Component({
  selector: 'app-comprador-tarjeta',
  templateUrl: './comprador-tarjeta.component.html',
  styleUrls: ['./comprador-tarjeta.component.css']
})
export class CompradorTarjetaComponent implements OnInit {

  @Input() comprador: Comprador;
  public admin: Administrador;
  public direccionImagen = base_url+"/upload/compradores/"
  imagenFirebase:boolean= false;

  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  async ngOnInit() {
    this.admin = await this.usuarioService.getAdministrador();
    if(this.comprador.img.startsWith("https")){
      this.imagenFirebase = true;
    }
  }

  borrarComprador(){
    Swal.fire({
      title: 'Va a eliminar la cuenta de este comprador y todos sus datos.',
      text: '¿Está seguro?',
      showCancelButton: true,
      confirmButtonText: `Sí`, 
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.borrarComprador(this.comprador.uid)
        .subscribe( resp => {
          Swal.fire( 'Borrado', 'Cuenta eliminada.', 'success' );
          location.reload();
        }, (err) => {
          Swal.fire('Error', 'Ha habido un problema.', 'error');
        });
      } 
    })
  }

}
