import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AsistenteTecnico } from '../../models/asistente';
import { Administrador } from '../../models/administrador';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Component({
  selector: 'app-asistente-tarjeta',
  templateUrl: './asistente-tarjeta.component.html',
  styleUrls: ['./asistente-tarjeta.component.css']
})
export class AsistenteTarjetaComponent implements OnInit {

  @Input() asistente: AsistenteTecnico;
  public admin: Administrador;
  public direccionImagen = base_url+"/upload/asistentes/"
  imagenFirebase:boolean= false;
  noImagen:boolean = false;

  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

    async ngOnInit() {
    this.admin = await this.usuarioService.getAdministrador();
    if(this.asistente.img.startsWith("https")){
      this.imagenFirebase = true;
    }else if(this.asistente.img == ""){
      this.noImagen = true;
    }
  }

  borrarAsistente(){
    Swal.fire({
      title: 'Va a eliminar la cuenta de este asistente técnico y todos sus datos.',
      text: '¿Está seguro?',
      showCancelButton: true,
      confirmButtonText: `Sí`, 
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.borrarAsistenteTecnico(this.asistente.uid)
        .subscribe( resp => {
          Swal.fire( 'Borrado', 'Cuenta eliminada.', 'success' );
          location.reload();
          /* this.router.navigateByUrl('/asistentes'); */
        }, (err) => {
          Swal.fire('Error', 'Ha habido un problema.', 'error');
        });
      } 
    })
  }

}
