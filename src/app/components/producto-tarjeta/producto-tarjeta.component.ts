import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';;
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
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
  
  constructor(private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private http: HttpClient,
    private router: Router){
      this.productoSeleccionado = new EventEmitter();
  }

  verProducto(){
    this.productoSeleccionado.emit(this.producto._id);
  }

  async ngOnInit() {
    this.estrellas = this.producto.puntuacionMedia;
    let estrella = String(this.estrellas);
    if (estrella.includes(".")){//es decimal
      let entero = estrella.charAt(0);
      this.estrellas = Number(entero);
    }
  }
}
