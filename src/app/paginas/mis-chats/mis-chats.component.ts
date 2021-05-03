import { Component, OnInit } from '@angular/core';
import { Chat } from '../../models/chat';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-chats',
  templateUrl: './mis-chats.component.html',
  styleUrls: ['./mis-chats.component.css']
})
export class MisChatsComponent implements OnInit {

  public chats: Chat[];

  constructor(private chatService : ChatService,
    private router: Router) { }

    async ngOnInit() {
      this.chats = await (this.chatService.getMisChats());
    }

    verChat(id: number ){
      this.router.navigate(['/chat', id]);
    }

}
