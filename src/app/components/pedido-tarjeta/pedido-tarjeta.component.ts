import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';import { Pedido } from 'src/app/models/pedido';
;
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Component({
  selector: 'app-pedido-tarjeta',
  templateUrl: './pedido-tarjeta.component.html',
  styleUrls: ['./pedido-tarjeta.component.css']
})
export class PedidoTarjetaComponent implements OnInit {

  
  public producto: Producto;
  @Input() pedido: Pedido;
  public direccionImagen = base_url+"/upload/productos/"
  
  constructor(private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private http: HttpClient,
    private router: Router
    ){ }

  async ngOnInit() {
    this.producto= await this.productoService.getProductoPorID(this.pedido.producto);


    
  }
}
