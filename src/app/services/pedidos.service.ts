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

}
