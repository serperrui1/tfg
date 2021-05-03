import { Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { map, tap } from 'rxjs/operators';
import { CrearProductoComponent } from '../paginas/crear-producto/crear-producto.component';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get usuario(): string {
    return localStorage.getItem('usuario');
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
        'usuario': this.usuario
      }
    }
  }

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
      resolve => {
        this.http.get(`${base_url}/productos/mis-productos`,{
          headers: { 
            'x-token': this.token
          }
        }).subscribe(data=>{
          const productos = data["productos"];
          resolve(productos);
        });
      })
  }

  getProductos():Promise<Producto[]>{
    return new Promise<Producto[]>(
      resolve => {
        this.http.get(`${base_url}/productos/`,{
        }).subscribe(data=>{
          const productos = data["productos"];
          resolve(productos);
        });
      })
  }

  getProductosPorProveedorId(id:string):Promise<Producto[]>{
    return new Promise<Producto[]>(
      resolve => {
        this.http.get(`${base_url}/productos/productos-de/${id}`,{
        }).subscribe(data=>{
          const productos = data["productos"];
          resolve(productos);
        });
      })
  }

  getBuscadorProductos(data:any):Promise<Producto[]>{
    return new Promise<Producto[]>(
      resolve => {
        this.http.post(`${base_url}/productos/buscador`,data,{
        }).subscribe(data=>{
          const productos = data["productos"];
          resolve(productos);
        });
      })
  }

  /* getProductos() {
    const url = `${ base_url }/productos/`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, productos: Producto[] }) => resp.productos )
              );
  } */

  

  actualizarProducto( data: Producto , pid:string) {

    return this.http.put(`${ base_url }/productos/${ pid }`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }


  /* borrarProducto( _id: string ) {
    const url = `${ base_url }/productos/mis-productos/${ _id }`;
    return this.http.delete( url, this.headers );
  } */

  borrarProducto( _id: string ) {
    const url = `${ base_url }/productos/${ _id }`;
    return this.http.delete( url, this.headers );
  }

  


  crearProducto( formData: CrearProductoComponent):Promise<string>{

    return new Promise<string> (resolve=> {

      this.http.post(`${ base_url }/productos`, formData, this.headers )
      .subscribe(data =>{
        const productoId:string= data["producto"]["_id"];
        resolve(productoId);
      });
    } )
  }

  /* crearProducto( formData: CrearProductoComponent) {

    return this.http.post(`${ base_url }/productos`, formData, this.headers );

  } */


  
  crearValoracion( data: FormData, pid:string) {

    return this.http.put(`${ base_url }/productos/valoracion/${ pid }`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  borrarValoracion( data:any, pid:string) {

    return this.http.put(`${ base_url }/productos/borrar-valoracion/${ pid }`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }
}