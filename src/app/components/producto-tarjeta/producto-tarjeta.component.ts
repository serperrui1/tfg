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
  
  
  // public producto: Producto;
  // @Input() id: string;
  @Input() producto: Producto
  public direccionImagen = base_url+"/upload/productos/"
  @Output() productoSeleccionado: EventEmitter<string>;
  
  constructor(private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private http: HttpClient,
    private router: Router
    ){
      this.productoSeleccionado = new EventEmitter();


  }

  verProducto(){
    this.productoSeleccionado.emit(this.producto._id);
 
  }

  async ngOnInit() {
    //this.producto= await this.productoService.getProductoPorID(this.id);


    
  }
}
