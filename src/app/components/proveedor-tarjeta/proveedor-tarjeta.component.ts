import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UsuarioService } from '../../services/usuario.service';
import { Proveedor } from '../../models/proveedor';
import Swal from 'sweetalert2';
import { Administrador } from '../../models/administrador';

const base_url = environment.base_url;

@Component({
  selector: 'app-proveedor-tarjeta',
  templateUrl: './proveedor-tarjeta.component.html',
  styleUrls: ['./proveedor-tarjeta.component.css']
})
export class ProveedorTarjetaComponent implements OnInit {

  @Input() proveedor: Proveedor;
  public admin: Administrador;
  public direccionImagen = base_url+"/upload/proveedores/"
  @Output() proveedorSeleccionado: EventEmitter<string>;
  estrellas= 0;
  imagenFirebase:boolean=false;
  noImagen:boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private router: Router){
      this.proveedorSeleccionado = new EventEmitter();
  }

  verProveedor(){
    this.proveedorSeleccionado.emit(this.proveedor.uid);
  }

  async ngOnInit() {
    if(localStorage.getItem("usuario")=="administrador"){
      this.admin = await this.usuarioService.getAdministrador();
    }
    if(this.proveedor.img.startsWith("https")){
      this.imagenFirebase = true;
    }else if(this.proveedor.img == ""){
      this.noImagen = true;

    }
    
    this.estrellas = this.proveedor.puntuacionMedia;
    let estrella = String(this.estrellas);
    if (estrella.includes(".")){//es decimal
      let entero = estrella.charAt(0);
      this.estrellas = Number(entero);
    }
  }

  borrarProveedor(){
    Swal.fire({
      title: 'Va a eliminar la cuenta de este proveedor y todos sus datos.',
      text: '¿Está seguro?',
      showCancelButton: true,
      confirmButtonText: `Sí`, 
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.borrarProveedor(this.proveedor.uid)
        .subscribe( resp => {
          Swal.fire( 'Borrado', 'Cuenta eliminada.', 'success' );
          this.router.navigateByUrl('/proveedores');
        }, (err) => {
          Swal.fire('Error', 'Ha habido un problema.', 'error');
        });
      } 
    })
  }


}
