import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chat } from '../../models/chat';
import { ChatService } from '../../services/chat.service';
import { Comprador } from '../../models/comprador';
import { Proveedor } from '../../models/proveedor';
import { UsuarioService } from '../../services/usuario.service';
import { Pedido } from '../../models/pedido';
import { PedidosService } from '../../services/pedidos.service';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

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
  public apellidosComprador: string;
  public flag: boolean = false;
  public pedidoId: string = "";
  public unPedido: Pedido;
  public lePedido: Pedido;

  public producto: Producto;

  constructor(private usuarioService: UsuarioService,
    private pedidosService: PedidosService,
    private productoService : ProductoService,) {
    this.chatSeleccionado = new EventEmitter();
  }

  async ngOnInit() {
    this.chat = this.data;
    for(let mensaje of this.chat.mensajes){
      if(mensaje.includes(" - DEV/RCL: ")){
        this.pedidoId = mensaje.split(' - DEV/RCL: ').pop();
        console.log(this.pedidoId);
        this.unPedido = await this.pedidosService.getPedidoPorID(this.pedidoId);
        console.log(this.unPedido);
        this.producto = await this.productoService.getProductoPorID(this.unPedido.producto);
        this.flag = true;
      } else {
        this.producto = await this.productoService.getProductoPorID(this.chat.productoId);
      }
    }
    

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

    if(this.prov){
      this.nombreComprador = await this.usuarioService.getCompradorNombre(this.chat.compradorId);
      var compradores = (await this.usuarioService.getCompradores()).filter((e) => e.uid == this.chat.compradorId);
      this.apellidosComprador = compradores[0].apellidos;
    }
    

  }

  verChat(){
    this.chatSeleccionado.emit(this.chat._id);
  }

}
