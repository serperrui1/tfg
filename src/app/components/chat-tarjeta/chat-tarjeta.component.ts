import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chat } from '../../models/chat';
import { ChatService } from '../../services/chat.service';
import { Comprador } from '../../models/comprador';
import { Proveedor } from '../../models/proveedor';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-chat-tarjeta',
  templateUrl: './chat-tarjeta.component.html',
  styleUrls: ['./chat-tarjeta.component.css']
})
export class ChatTarjetaComponent implements OnInit {

  public chat: Chat;
  @Input() data: Chat;
  @Output() chatSeleccionado: EventEmitter<string>;
  public comp: Comprador;
  public prov: Proveedor;
  public ultimoMensaje:string;
  public res:number = 0;

  constructor(private chatService: ChatService,
    private usuarioService: UsuarioService) {
    this.chatSeleccionado = new EventEmitter();
   }

  async ngOnInit() {
    this.chat = this.data;
    this.comp = await this.usuarioService.getComprador();
    if(this.comp === null){
      this.prov = await this.usuarioService.getProveedor();
    }
    
    if(this.comp){
      this.ultimoMensaje = this.chat.mensajes[this.chat.mensajes.length-1];
      if(this.ultimoMensaje.indexOf(this.comp.nombre) != 0){
        this.res = JSON.parse(localStorage.getItem(this.chat._id));
      }
    }

    if(this.prov){
      this.ultimoMensaje = this.chat.mensajes[this.chat.mensajes.length-1];
      if(this.ultimoMensaje.indexOf(this.prov.nombreEmpresa) != 0){
        this.res = JSON.parse(localStorage.getItem(this.chat._id));
      }
    }
  }

  verChat(){
    this.chatSeleccionado.emit(this.chat._id);
  }

}
