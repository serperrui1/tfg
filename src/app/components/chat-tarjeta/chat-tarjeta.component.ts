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
  public notificacion: boolean = false;
  public nombreComprador: string;

  constructor(private usuarioService: UsuarioService) {
    this.chatSeleccionado = new EventEmitter();
  }

  async ngOnInit() {
    this.chat = this.data;

    this.comp = await this.usuarioService.getComprador();
    if(this.comp === null){
      this.prov = await this.usuarioService.getProveedor();
    }

    if(this.comp && this.chat.ultimoEmisor != this.comp.uid && !this.chat.leido){
      this.notificacion = true;
    }

    if(this.prov && this.chat.ultimoEmisor != this.prov.uid && !this.chat.leido){
      this.notificacion = true;
    }

    this.nombreComprador = await this.usuarioService.getCompradorNombre(this.chat.compradorId);
  }

  verChat(){
    this.chatSeleccionado.emit(this.chat._id);
  }

}
