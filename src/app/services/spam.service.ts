import { Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { CrearFaqComponent } from '../paginas/crear-faq/crear-faq.component';
import { Faq } from '../models/faq';
import { Spam } from '../models/spam';
import { SpamComponent } from '../paginas/spam/spam.component';
import Swal from 'sweetalert2';
import { AbstractControl, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class SpamService {

  public expresionesSpam: string[];
  public flag: boolean = false;
  public spam: Spam;

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

  getSpam():Promise<Spam[]>{
    return new Promise<Spam[]>(
      resolve => {
        this.http.get(`${base_url}/spam/`,{
        }).subscribe(data=>{
          const spam = data["spam"];
          console.log(spam)
          resolve(spam);
        });
      })
  }

  actualizarSpam( spam:Spam) {
    return this.http.put(`${ base_url }/spam/`, spam, this.headers);
  }

  /* async spamChecker( posibleSpam: string ){
    this.expresionesSpam = await this.getSpam()[0];
    this.flag = false;
    for(let expresion of this.expresionesSpam){
      if (posibleSpam.includes(expresion) && !this.flag){
        this.flag = true;
        Swal.fire('Error', 'Este campo incluye una palabra spam', 'error');
      }
    }
    this.flag = false;
  } */


  spamValidator(control: FormControl):Promise<any> | Observable<any> {
    return new Promise(async resolve => {
      this.spam = (await this.getSpam())[0];
      this.expresionesSpam = this.spam.expresiones;
      for(let expresion of this.expresionesSpam){
        if (control.value.includes(expresion)){
          this.flag = true;
          break;
        }
      }
      if (this.flag){
        resolve ({spamError: true});
      } else {
        resolve (null);
      }
    });
  }


}