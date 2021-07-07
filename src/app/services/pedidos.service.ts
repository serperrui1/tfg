import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pedido } from '../models/pedido';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

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


  getMisPedidos():Promise<Pedido[]>{
    return new Promise<Pedido[]>(
      resolve => {
        this.http.get(`${base_url}/pedidos/mis-pedidos`,{
          headers: { 
            'x-token': this.token
          }
        }).subscribe(data=>{
          const pedidos = data["pedidos"];
          resolve(pedidos);
        });
      })
  }

  getBuscadorPedidos(data:any):Promise<Pedido[]>{
    return new Promise<Pedido[]>(
      resolve => {
        this.http.post(`${base_url}/pedidos/buscador`,data,{
          headers: { 
            'x-token': this.token
          }
         }).subscribe(data=>{
          const pedidos = data["pedidos"];
          resolve(pedidos);
        });
      })
  }

  getMisPedidosProveedor():Promise<Pedido[]>{
    return new Promise<Pedido[]>(
      resolve => {
        this.http.get(`${base_url}/pedidos/mis-pedidos-proveedor`,{
          headers: { 
            'x-token': this.token
          }
        }).subscribe(data=>{
          const pedidos = data["pedidos"];
          resolve(pedidos);
        });
      })
  }

  getPedidos():Promise<Pedido[]>{
    return new Promise<Pedido[]>(
      resolve => {
        this.http.get(`${base_url}/pedidos/todos`,{
          headers: { 
            'x-token': this.token
          }
        }).subscribe(data=>{
          const pedidos = data["pedidos"];
          resolve(pedidos);
        });
      })
  }

  getPedidoPorID(id:string):Promise<Pedido>{
    return new Promise<Pedido>(
      resolve=> {
        this.http.get(`${base_url}/pedidos/pedido/${id}`,{
         headers: { 
           'x-token': this.token
         }
        }).subscribe(data=>{
          const pedido = data["pedido"];
          resolve(pedido);
        });
     })
   }

  actualizarEnvio(id:string, estado:string):Promise<Pedido>{
    return new Promise<Pedido>(
      resolve=> {
        this.http.put(`${base_url}/pedidos/envio/${id}`,{estado: estado },{
         headers: { 
           'x-token': this.token
         }
        }).subscribe(data=>{
          if(data["ok"]){
            const pedido = data["pedido"];
            resolve(pedido);
            location.reload();
          }
          

        });
     })
  }
}
