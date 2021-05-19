import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos-categoria',
  templateUrl: './productos-categoria.component.html',
  styleUrls: ['./productos-categoria.component.css']
})
export class ProductosCategoriaComponent implements OnInit {

  productos:Producto[] = [];
  categoria:string;
  public orden = this.fb.group({
    orden:['masVendidos']
  });
  p: number = 1;

  constructor(private router:Router,
    private fb: FormBuilder,
    private productoService:ProductoService,
    private activatedRoute: ActivatedRoute) {

      this.activatedRoute.params.subscribe(params =>{
      this.categoria = params['categoria'];
        
      });
     }

  async ngOnInit(){
    this.productos = await this.productoService.getProductosPorCategoria(this.categoria);
    console.log(this.productos);
  }
  verProducto(id: number ){
    this.router.navigate(['/producto', id]);
  }

  async ordenar(){
    if(this.orden.controls['orden'].value=="precioAscendente")
      this.productos.sort(((a, b) => (a.precio < b.precio) ? 1 : -1))
    else if(this.orden.controls['orden'].value=="precioDescendente")
      this.productos.sort(((a, b) => (a.precio > b.precio) ? 1 : -1))
    else if(this.orden.controls['orden'].value=="unidadesAscendente")
      this.productos.sort(((a, b) => (a.unidadesMinimas < b.unidadesMinimas) ? 1 : -1))
    else if(this.orden.controls['orden'].value=="unidadesDescendente")
      this.productos.sort(((a, b) => (a.unidadesMinimas > b.unidadesMinimas) ? 1 : -1))
    else if(this.orden.controls['orden'].value=="stockAscendente")
      this.productos.sort(((a, b) => (a.stock < b.stock) ? 1 : -1))
    else if(this.orden.controls['orden'].value=="stockDescendente")
      this.productos.sort(((a, b) => (a.stock > b.stock) ? 1 : -1))
    else if(this.orden.controls['orden'].value=="productosEstrella")
      this.productos.sort(((a, b) => ( a.productoEstrella.valueOf() === b.productoEstrella.valueOf())  ? -1 : 1))
    else if(this.orden.controls['orden'].value=="masValorados")
      this.productos.sort(((a, b) => (a.valoraciones.length < b.valoraciones.length) ? 1 : -1))
    else if(this.orden.controls['orden'].value=="mejorValorados")
      this.productos.sort(((a, b) => (a.puntuacionMedia < b.puntuacionMedia) ? 1 : -1))
    else if(this.orden.controls['orden'].value=="masVendidos")
      this.productos.sort(((a, b) => (a.unidadesVendidas < b.unidadesVendidas) ? 1 : -1))
    
  }

}
