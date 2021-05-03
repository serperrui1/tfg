import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goat',
  templateUrl: './goat.component.html',
  styleUrls: ['./goat.component.css']
})
export class GOATComponent implements OnInit {

  public productos: Producto[] = []; 
  public bestValued: Producto[] = [];
  public best3: Producto[] = [];
  public primero: Producto;
  public segundo: Producto;
  public tercero: Producto;
  /* public mediasCompara: number[] = []; */
  public token: string;
  public usuario:string;
  public notaCorte: number = 4;
  public notaSaver: number = 0;
  /* public notaSaver1: number = 0; */
  public notaSaver2: number = 0;
  public numElements: number = 0;
  public mediaProducto: number;

  constructor(private productoService : ProductoService, 
    private router: Router) {
      this.usuario =localStorage.getItem('usuario');
      this.token =localStorage.getItem('token');
   }

   async ngOnInit() {
     /* let map = new Map(); */
     this.productos = await this.productoService.getProductos();
     for(let producto of this.productos){
      if(producto.valoraciones != null && producto.valoraciones.length != 0){
        for(let valoracion of producto.valoraciones){
          this.numElements = this.numElements + 1; //cantidad de valoraciones
          this.notaSaver = this.notaSaver + valoracion.puntuacion;//acumulador de notas de un producto
        }
        this.mediaProducto = this.notaSaver / this.numElements; //se calcula la media de las notas asociadas al producto por el que va el for
        if (this.mediaProducto >= this.notaCorte){
          this.bestValued.push(producto); //En caso de que el producto pase el corte, se almacena en la lista de aquellos mejor valorados
          /* this.mediasCompara.push(this.mediaProducto); */// bestValued[0] tiene su media guardada en mediasCompara[0]
          /* map.set(producto, this.mediaProducto); */
        }
      }
     }
     
     if(this.bestValued != []){
      function comparar (a, b) {
        let notaSaver1: number = 0;
        let notaSaver2: number = 0;

        for(let val1 of a.valoraciones){
          notaSaver1 = notaSaver1 + val1.puntuacion;
        }
        let num1 = notaSaver1 / a.valoraciones.length;

        for(let val2 of b.valoraciones){
          notaSaver2 = notaSaver2 + val2.puntuacion;
        }
        let num2 = notaSaver2 / b.valoraciones.length;

        if(num1 > num2){
          return 1;
        } else if(num1 < num2){
          return -1;
        }else{
          return 0;
        }
      }
      this.bestValued.sort(comparar);

      this.best3.push(this.bestValued[this.bestValued.length - 1]); // el número 1
      this.primero = this.bestValued[this.bestValued.length - 1];
      if(this.bestValued.length > 1){
        this.best3.push(this.bestValued[this.bestValued.length - 2]);
        this.segundo = this.bestValued[this.bestValued.length - 2];
      }
      if(this.bestValued.length > 2){
        this.best3.push(this.bestValued[this.bestValued.length - 3]);
        this.tercero = this.bestValued[this.bestValued.length - 3];
      }

     }

  }

  verProducto(id: number ){
    this.router.navigate(['/producto', id]);
  }



}
