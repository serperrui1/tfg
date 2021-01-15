import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public productos: Producto[];

  constructor(private productoService : ProductoService,
    private router: Router) { }

  async ngOnInit() {
    this.productos = await (this.productoService.getProductos());
    console.log(this.productos[0]._id)
  }

  verProducto(id: number ){
    this.router.navigate(['/producto', id]);
  }

}