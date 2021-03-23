import { Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { map, tap } from 'rxjs/operators';
import { CrearProductoComponent } from '../paginas/crear-producto/crear-producto.component';
import { Incidencia } from '../models/incidencia';
import { CrearIncidenciaComponent } from '../paginas/crear-incidencia/crear-incidencia.component';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class IncidenciaService {

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

  getIncidenciaPorID(id:string):Promise<Incidencia>{
     return new Promise<Incidencia>(
       resolve=> {
         this.http.get(`${base_url}/incidencias/incidencia/${id}`,{
          headers: { 
            'x-token': this.token
          }
         }).subscribe(data=>{
           const incidencia = data["incidencia"];
           resolve(incidencia);
         });
      })
  }

  getMisIncidencias():Promise<Incidencia[]>{
    return new Promise<Incidencia[]>(
      resolve => {
        this.http.get(`${base_url}/incidencias/mis-incidencias`,{
          headers: { 
            'x-token': this.token
          }
        }).subscribe(data=>{
          const incidencias = data["incidencias"];
          resolve(incidencias);
        });
      })
  }

  getIncidencias():Promise<Incidencia[]>{
    return new Promise<Incidencia[]>(
      resolve => {
        this.http.get(`${base_url}/incidencias`,{
          headers: { 
            'x-token': this.token
          }
        }).subscribe(data=>{
          const incidencias = data["incidencias"];
          resolve(incidencias);
        });
      })
  }

  actualizarIncidencia( data: Incidencia , id:string) {
    return this.http.put(`${ base_url }/incidencias/actualizar/${ id }`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  incidenciaLeida(id:string):Promise<Incidencia>{
    return new Promise<Incidencia>(
      resolve=> {
        this.http.put(`${base_url}/incidencias/leida/${id}`,{},{
         headers: { 
           'x-token': this.token
         }
        }).subscribe(data=>{
          const incidencia = data["incidencia"];
          resolve(incidencia);
        });
      })
  }

  borrarIncidencia( _id: string ) {
    const url = `${ base_url }/incidencias/${ _id }`;
    return this.http.delete( url, this.headers );
  }

  crearIncidencia( formData: CrearIncidenciaComponent) {
    return this.http.post(`${ base_url }/incidencias/`, formData, this.headers );
  }

}