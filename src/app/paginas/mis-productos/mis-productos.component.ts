import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.css']
})
export class MisProductosComponent {

  categoria: string;

  public filtro = this.fb.group({
    titulo:[''],
    categoria:[''],
    subcategoria:[''],
    precioMinimo:[''],
    precioMaximo:[''],
    udsMinimasMinimo:[''],
    udsMinimasMaximo:[''],
    stockMinimo:[''],
    stockMaximo:[''],
    valoraciones:[''],
  });

  public productos: Producto[];

  public orden = this.fb.group({
    orden:['masVendidos']
  });

  constructor(
    private productoService : ProductoService,
    private fb: FormBuilder,
    private router: Router,
    ) {}

  async ngOnInit() {
    this.productos = await (this.productoService.getMisProductos());
    this.filtro.get('categoria').setValue(this.productos[0].categoria);
  }

  async buscar(){
    this.productos = await this.productoService.getBuscadorMisProductos(this.filtro.value)
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

  verProducto(id: number ){
    this.router.navigate(['/producto', id]);
  }

}
