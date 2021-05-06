import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SubirImagenService {

  constructor(private http: HttpClient,
    private router: Router) { }

  async postearImagen( archivo: File, tipo: 'productos', id: string) :Promise<string> {

    return new Promise<string> ((resolve) => {

      const formData = new FormData();
      formData.append('imagen', archivo);
      this.http.post(`${ base_url }/upload/${ tipo }/${ id }`,formData,{
        headers: {
          'x-token': localStorage.getItem('token') || ''   
        }
      } ).subscribe((data)=>{
          const ok = data["ok"]
          if(ok == true ){
            resolve(data["nombreArchivo"]);
          }else{
            Swal.fire('Error', data["msg"], 'error');

          }
      })
    })
  }
}
