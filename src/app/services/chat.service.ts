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
    return this.http.put(`${ base_url }/chats/actualizar/${ id }`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  chatLeido(id:string):Promise<Chat>{
    return new Promise<Chat>(
      resolve=> {
        this.http.put(`${base_url}/chats/leido/${id}`,{},{
         headers: { 
           'x-token': this.token
         }
        }).subscribe(data=>{
          const chat = data["chat"];
          resolve(chat);
        });
     })
   }
  
  borrarChat( _id: string ) {
    const url = `${ base_url }/chats/${ _id }`;
    return this.http.delete( url, this.headers );
  }

  crearChat( formData: CrearChatComponent):Promise<string>{

    return new Promise<string> (resolve=> {

      this.http.post(`${ base_url }/chats/`, formData, this.headers )
      .subscribe(data =>{
        const chatId:string= data["chat"]["_id"];
        console.log(chatId);
        resolve(chatId);
      });
    } )
  }

  existeChat( proveedorId:string ):Promise<string>{
    let data ={
      proveedorId : proveedorId
    }

    return new Promise<string> (resolve=> {

      this.http.post(`${ base_url }/chats/existe-chat`, data, this.headers )
      .subscribe(data =>{
        const chatId:string= data["chatId"]
        resolve(chatId);
      });
    } )
  }

}