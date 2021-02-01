import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  public productos: Producto[];
  busqueda :string;

  constructor(private activatedRoute: ActivatedRoute,
    private router:Router,
    private productoService:ProductoService) { }

  async ngOnInit(){
  this.activatedRoute.params.subscribe(async params =>{
  this.busqueda = params['producto'];
  this.productos = await this.productoService.getBuscadorProductos(this.busqueda)
  this.productos
  })
  }
  verProducto(id: number ){
    this.router.navigate(['/producto', id]);
  }
}
