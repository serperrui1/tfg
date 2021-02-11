import { Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../models/pedido';
import { map, tap } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class CompraService {

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


  crearPedido( pedido: Pedido):Promise<string>{

    return new Promise<string> (resolve=> {

      this.http.post(`${ base_url }/pedidos`, pedido, this.headers )
      .subscribe(data =>{
        const pedidoId:string= data["pedido"]["_id"];
        console.log(pedidoId);
        resolve(pedidoId);
      });
    } )
  }

}