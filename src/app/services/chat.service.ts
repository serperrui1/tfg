import { Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../models/chat';
import { CrearChatComponent } from '../paginas/crear-chat/crear-chat.component';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class ChatService {

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

  getChatPorID(id:string):Promise<Chat>{
     return new Promise<Chat>(
       resolve=> {
         this.http.get(`${base_url}/chats/chat/${id}`,{
          headers: { 
            'x-token': this.token
          }
         }).subscribe(data=>{
           const chat = data["chat"];
           resolve(chat);
         });
      })
  }


  getMisChats():Promise<Chat[]>{
    return new Promise<Chat[]>(
      resolve => {
        this.http.get(`${base_url}/chats/mis-chats`,{
          headers: { 
            'x-token': this.token
          }
        }).subscribe(data=>{
          const chats = data["chats"];
          resolve(chats);
        });
      })
  }


  actualizarChat( data: Chat , id:string) {
    return this.http.put(`${ base_url }/chats/${ id }`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }


  borrarChat( _id: string ) {
    const url = `${ base_url }/chats/${ _id }`;
    return this.http.delete( url, this.headers );
  }


  crearChat( formData: CrearChatComponent) {
    return this.http.post(`${ base_url }/chats/`, formData, this.headers );
  }

}