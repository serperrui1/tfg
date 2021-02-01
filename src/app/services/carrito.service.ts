import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from './producto.service';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  public items: Producto[] = [];
  public cantidades: number[] = [];

  alCarrito(producto, cantidad) {
    this.items = JSON.parse(localStorage.getItem('items')) || [];
    this.cantidades = JSON.parse(localStorage.getItem('cantidades')) || [];
    this.items.push(producto);
    this.cantidades.push(cantidad);
    localStorage.setItem('items', JSON.stringify(this.items));
    localStorage.setItem('cantidades', JSON.stringify(this.cantidades));
  }

  getCarrito() {
    this.items = JSON.parse(localStorage.getItem('items'));
    return this.items; 
  }

  getCantidades() {
    this.cantidades = JSON.parse(localStorage.getItem('cantidades'));
    return this.cantidades; 
  }

  borrarCarrito() {
    this.items = [];
    localStorage.removeItem('items');
    localStorage.removeItem('cantidades');
    return this.items;
  }

  

  /* getCarrito() {
    return JSON.parse(localStorage.getItem('items'));
 }

 borrarCarrito() {
   this.items = [];
   localStorage.removeItem('items');
   return this.items;
 }
 
 alCarrito(producto) {
     // Parse any JSON previously stored in allEntries
     this.items = JSON.parse(localStorage.getItem("items"));
     if(this.items == null){
       this.items = [];
     } 
     localStorage.setItem("item", JSON.stringify(producto));
     // Save allEntries back to local storage
     this.items.push(producto);
     localStorage.setItem("items", JSON.stringify(this.items));
 }; */
}