import { Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  constructor(private http: HttpClient,
    private router: Router) { }


   getProductoPorID(id:string):Promise<Producto>{
     return new Promise<Producto>(
       resolve=> {
       this.http.get(`${base_url}/productos/producto/${id}`).subscribe(data=>{
         const producto = data["producto"];
         resolve(producto);
       });
   })
}


getMisProductos():Promise<Producto[]>{
  return new Promise<Producto[]>(
    resolve=> {
    this.http.get(`${base_url}/productos/misproductos`,{
      headers: {
        'x-token': this.token
      }
    }).subscribe(data=>{
      const productos = data["productos"];
      resolve(productos);
    });
})
}

}