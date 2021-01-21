import { Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { CrearFaqComponent } from '../paginas/crear-faq/crear-faq.component';
import { Faq } from '../models/faq';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class FaqService {

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

  getFaqs():Promise<Faq[]>{
    return new Promise<Faq[]>(
      resolve => {
        this.http.get(`${base_url}/faqs/`,{
          headers: { 
            'x-token': this.token
          }
        }).subscribe(data=>{
          const faqs = data["faqs"];
          resolve(faqs);
        });
      })
  }

  getFaq(id: string):Promise<Faq>{
     return new Promise<Faq>(
       resolve=> {
         this.http.get(`${base_url}/faqs/${id}`).subscribe(data=>{
           const faq = data["faq"];
           resolve(faq);
         });
      })
  }

  borrarFaq(id: string){
    const url = `${ base_url }/faqs/${id}`;
    return this.http.delete(url, this.headers);
  }

  crearFaq( formData: CrearFaqComponent) {
    return this.http.post(`${ base_url }/faqs/`, formData, this.headers );
  }

}