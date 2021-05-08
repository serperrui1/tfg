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
export class BuscadorComponent implements OnInit {
  public productos: Producto[];
  titulo :string;
  valoraciones: number;

  public filtro = this.fb.group({
    categoria:[''],
    subcategoria:[''],
    precioMinimo:[0],
    precioMaximo:[10000000],
    valoraciones:[0],
    titulo:['']

  });
  public orden = this.fb.group({
    orden:['masValorados']

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
  
  let data={
    titulo:this.titulo,
    categoria:"",
    subcategoria:"",
    valoraciones:this.valoraciones
  }

  this.productos = await this.productoService.getBuscadorProductos(data)
  this.productos
  })
  }
  verProducto(id: number ){
    this.router.navigate(['/producto', id]);
  }

  async buscar(){
    this.productos = await this.productoService.getBuscadorProductos(this.filtro.value)
  }

  async ordenar(){
    if(this.orden.controls['orden'].value=="precioAscendente")
    this.productos.sort(((a, b) => (a.precio > b.precio) ? 1 : -1))
    else if(this.orden.controls['orden'].value=="precioDescendente")
    this.productos.sort(((a, b) => (a.precio < b.precio) ? 1 : -1))
    else if(this.orden.controls['orden'].value=="masValorados")
    this.productos.sort(((a, b) => (a.valoraciones.length < b.valoraciones.length) ? 1 : -1))
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