import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Chat } from '../../models/chat';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PedidosService } from '../../services/pedidos.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-mis-chats',
  templateUrl: './mis-chats.component.html',
  styleUrls: ['./mis-chats.component.css']
})
export class MisChatsComponent implements OnInit {

  public orden = this.fb.group({
    orden:['mensajesMasRecientes'],
  });

  public buscadorForm = this.fb.group({
    chat:['mensajesMasRecientes']
  });

  public chats: Chat[];
  public chats1: Chat[] = [];
  public chats2: Chat[] = [];

  constructor(private chatService : ChatService,
    private fb: FormBuilder,
    private pedidoService: PedidosService,
    private router: Router) { }

    async ngOnInit() {
      this.chats = await (this.chatService.getMisChats());
      for(let chat of this.chats){
        if(chat.fechaPedido != ""){
          this.chats2.push(chat);
        }else{
          this.chats1.push(chat)
        }
      }
    }

    verChat(id: number ){
      this.router.navigate(['/chat', id]);
    }

    async ordenar1(){
      if(this.orden.controls['orden'].value=="mensajesMasRecientes")
        this.chats1.sort(((a, b) => (new Date(a.fechaPublicacion).getTime() < new Date(b.fechaPublicacion).getTime() ? 1 : -1)))
      else if(this.orden.controls['orden'].value=="mensajesMasAntiguos")
        this.chats1.sort(((a, b) => (new Date(a.fechaPublicacion).getTime() > new Date(b.fechaPublicacion).getTime() ? 1 : -1)))
      else if(this.orden.controls['orden'].value=="noLeidasPrimero")
        this.chats1.sort(((a, b) => ( a.leido.valueOf() === b.leido.valueOf()  ? 1 : -1)))
    } 

    async ordenar2(){
      if(this.orden.controls['orden'].value=="mensajesMasRecientes")
        this.chats2.sort(((a, b) => (new Date(a.fechaPublicacion).getTime() < new Date(b.fechaPublicacion).getTime() ? 1 : -1)))
      else if(this.orden.controls['orden'].value=="mensajesMasAntiguos")
        this.chats2.sort(((a, b) => (new Date(a.fechaPublicacion).getTime() > new Date(b.fechaPublicacion).getTime() ? 1 : -1)))
      else if(this.orden.controls['orden'].value=="pedidosMasRecientes")
        this.chats2.sort(((a, b) => (new Date(a.fechaPedido).getTime() < new Date(b.fechaPedido).getTime() ? 1 : -1)))
      else if(this.orden.controls['orden'].value=="pedidosMasAntiguos")
        this.chats2.sort(((a, b) => (new Date(a.fechaPedido).getTime() > new Date(b.fechaPedido).getTime() ? 1 : -1)))
      else if(this.orden.controls['orden'].value=="noLeidasPrimero")
        this.chats2.sort(((a, b) => ( a.leido.valueOf() === b.leido.valueOf()  ? 1 : -1)))
    } 

    async buscar(){
      this.chats = await this.chatService.getBuscadorChats(this.buscadorForm.value);
      console.log(this.chats)
      this.chats2 = [];
      this.chats1 = [];
      for(let chat of this.chats){
        if(chat.fechaPedido != ""){
          this.chats2.push(chat);
          console.log(this.chats2)
        }else{
          this.chats1.push(chat)
          console.log(this.chats1)
        }
      }
      /* console.log(this.chats) */
      this.updateDiv();
      /* if(this.chats.length != 0){
        this.encontrados = true;
        this.chatsEncontrados = this.chats;
        location.reload();
      } */
    }

    updateDiv(){ 
      $( "#chats1" ).load(window.location.href + " #chats1" );
      $( "#chats2" ).load(window.location.href + " #chats2" );
    }

}
