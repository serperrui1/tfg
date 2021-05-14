import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { MapaComponent } from 'src/app/components/mapa/mapa.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {

  currentRate = 0;

  datos:any = {
    titulo:"",
    categoria:"",
    subcategoria:"",
    precioMinimo:"",
    precioMaximo:"",
    udsMinimasMinimo:"",
    udsMinimasMaximo:"",
    stockMinimo:"",
    stockMaximo:"",
    valoraciones: ""
  }
  categoria: string;
  titulo :string;
  valoraciones: number;

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

  productos: Producto[] = [];

  public orden = this.fb.group({
    orden:['masVendidos']
  });

  constructor(private activatedRoute: ActivatedRoute,
    private router:Router,
    private fb: FormBuilder,
    private productoService:ProductoService,
    public dialog: MatDialog) { }

  async ngOnInit(){

    this.activatedRoute.params.subscribe(async params =>{
      this.titulo = params['producto'] ||"";
      this.valoraciones = 0;
      this.filtro.controls['titulo'].setValue(this.titulo);

      this.datos = {
        titulo:this.titulo,
        categoria:"",
        subcategoria:"",
        precioMinimo:"",
        precioMaximo:"",
        udsMinimasMinimo:"",
        udsMinimasMaximo:"",
        stockMinimo:"",
        stockMaximo:"",
        valoraciones: this.valoraciones
      }
      this.productos = await this.productoService.getBuscadorProductos(this.datos);
      })
  }

  verProducto(id: number ){
    this.router.navigate(['/producto', id]);
  }

  async buscar(){
    this.datos["valoraciones"] = this.currentRate;
    this.productos = await this.productoService.getBuscadorProductos(this.filtro.value)
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

  openDialog() {
    let dialogRef = this.dialog.open(MapaComponent,{
      data:this.productos
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/producto', result.productoId]);
    })  
  }

  
}