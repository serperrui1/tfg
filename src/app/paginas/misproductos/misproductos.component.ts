import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-misproductos',
  templateUrl: './misproductos.component.html',
  styleUrls: ['./misproductos.component.css']
})
export class MisproductosComponent implements OnInit {
  public productos: Producto[];
  constructor(private productoService : ProductoService,
              private http : HttpClient,
              private router: Router) { 
  

              }

  async ngOnInit() {

    this.productos = await (this.productoService.getMisProductos());
    console.log(this.productos[0]._id)

    
  }
  verProducto(id: number ){
    this.router.navigate(['/producto', id]);
    
  }

}
