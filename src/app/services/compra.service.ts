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
        resolve(pedidoId);
      });
    } )
  }


  
  redsys(pedido: Pedido):Promise<any>{
    
    let Ds_MerchantParameters_NoBase64 = {
      "DS_MERCHANT_AMOUNT": pedido.precio.toString(),
      "DS_MERCHANT_CURRENCY": "978",
      "DS_MERCHANT_MERCHANTCODE": "999008881",
      "DS_MERCHANT_ORDER": "1446068581",
      "DS_MERCHANT_TERMINAL": "001",
      "DS_MERCHANT_TRANSACTIONTYPE": "0",
    };
    let Ds_MerchantParameters = btoa(JSON.stringify(Ds_MerchantParameters_NoBase64));
    let Ds_SignatureVersion = "HMAC_SHA256_V1"
    let Ds_Signature = btoa("009dec741715adaa731d5383fad6624065f5d1ff88a0f176defd4174956007d0");

    let data = {
      Ds_MerchantParameters,
      Ds_SignatureVersion,
      Ds_Signature
    }

    return new Promise<any> (resolve=> {

      this.http.post('https://sis-t.redsys.es:25443/sis/realizarPago', data)
      .subscribe(data =>{
        resolve(data);
      });
    } )
  }
    
    
  }

