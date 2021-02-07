import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chat } from '../../models/chat';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-tarjeta',
  templateUrl: './chat-tarjeta.component.html',
  styleUrls: ['./chat-tarjeta.component.css']
})
export class ChatTarjetaComponent implements OnInit {

  public chat: Chat;
  @Input() data: Chat;
  @Output() chatSeleccionado: EventEmitter<string>;

  constructor(private chatService: ChatService) {
    this.chatSeleccionado = new EventEmitter();
   }

   async ngOnInit() {
    this.chat = this.data;
  }

  verChat(){
    this.chatSeleccionado.emit(this.chat._id);
  }

}
