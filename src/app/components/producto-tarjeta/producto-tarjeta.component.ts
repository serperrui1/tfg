import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';;
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Component({
  selector: 'app-producto-tarjeta',
  templateUrl: './producto-tarjeta.component.html',
  styleUrls: ['./producto-tarjeta.component.css']
})
export class ProductoTarjetaComponent implements OnInit{ 
  
  
  @Input() producto: Producto
  public direccionImagen = base_url+"/upload/productos/"
  @Output() productoSeleccionado: EventEmitter<string>;
  estrellas= 0;
  imagenFirebase:boolean= false;
  proveedor: string;
  noImagen:boolean = false;
  
  constructor(private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private router: Router){
      
      this.productoSeleccionado = new EventEmitter();
  }

  verProducto(){
    this.productoSeleccionado.emit(this.producto._id);
  }

  async ngOnInit() {
    this.proveedor = await this.usuarioService.getProveedorNombre(this.producto.proveedor)
    
    if(this.producto.imagenes.length>0){
      if(this.producto.imagenes[0].startsWith("https")){
        this.imagenFirebase = true;
      }else if(this.producto.imagenes[0]== ""){
        this.noImagen = true;
      }
    }
    this.estrellas = this.producto.puntuacionMedia;
    let estrella = String(this.estrellas);
    if (estrella.includes(".")){//es decimal
      let entero = estrella.charAt(0);
      this.estrellas = Number(entero);
    }
  }
}
