import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comprador } from '../../models/comprador';
import { Producto } from '../../models/producto';
import { Chat } from '../../models/chat';
import { ChatService } from '../../services/chat.service';
import { ProductoService } from '../../services/producto.service';
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Proveedor } from '../../models/proveedor';
import Swal from 'sweetalert2';
import { PedidosService } from '../../services/pedidos.service';
import { Pedido } from 'src/app/models/pedido';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public token: string;
  public usuario:string;
  public chatForm: FormGroup;
  public chat: Chat;
  public chatId: string;
  public comp: Comprador;
  public flag: boolean = false;
  public compradorNombre: string = "";
  public prov: Proveedor;
  public producto: Producto;
  public unPedido: Pedido;
  public autor: string = "";
  public todosMensajes: string[] = [];
  public message: string = "";
  public pedidoId: string = "";
  public cont: number;
  public esQueja: boolean = false;
  public lastMessage: string = "";
  public firstMessage: string = "";
  public direccionImagen = base_url+"/upload/productos/"

  constructor(private fb:FormBuilder,
    private chatService: ChatService,
    private productoService : ProductoService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private pedidosService: PedidosService,
    private router: Router) {
      this.usuario =localStorage.getItem('usuario');
      this.token =localStorage.getItem('token');
  }

  async ngOnInit() {

    this.activatedRoute.params.subscribe( params => {
      this.chatId = params['id']; 
    });
    //Para diferenciar si es un chat o una devolución/reclamación-----
    this.chat = await this.chatService.getChatPorID(this.chatId);
    for(let mensaje of this.chat.mensajes){
      if(mensaje.includes(" - DEV/RCL: ")){
        this.pedidoId = mensaje.split(' - DEV/RCL: ').pop();
        this.unPedido = await this.pedidosService.getPedidoPorID(this.pedidoId);
        this.flag = true;
      }
    }
    //----------------------------------------------------------------
    this.producto = await this.productoService.getProductoPorID(this.chat.productoId);
    this.compradorNombre = await this.usuarioService.getCompradorNombre(this.chat.compradorId);
    this.comp = await this.usuarioService.getComprador();
        if(this.comp === null){
          this.prov = await this.usuarioService.getProveedor();
        }
    
    if (this.token != null && (this.usuario === "comprador" && this.comp != null)){
      this.autor = this.comp.nombre.trim() + ": ";
      this.chatForm = this.fb.group({
        compradorId: [ this.chat.compradorId ],
        proveedorId: [ this.chat.proveedorId ],
        proveedorNombre: [ this.chat.proveedorNombre ],
        compradorNombre: [ this.comp.nombre],
        productoId: [  this.chat.productoId ],
        mensajes: ['', Validators.required ],
        fechaPublicacion: [ this.chat.fechaPublicacion ]
      });
      this.chat = await this.chatService.chatLeido(this.chatId);
    }

    if (this.token != null && (this.usuario === "proveedor" && this.prov != null)){
      this.autor = this.prov.nombreEmpresa + ": ";
      this.chatForm = this.fb.group({
        compradorId: [ this.chat.compradorId ],
        proveedorId: [ this.chat.proveedorId ],
        proveedorNombre: [ this.chat.proveedorNombre ],
        compradorNombre: [ this.compradorNombre],
        productoId: [  this.chat.productoId ],
        mensajes: ['', Validators.required ],
        fechaPublicacion: [ this.chat.fechaPublicacion ]
      });
      this.chat = await this.chatService.chatLeido(this.chatId);
    }
    //No mostrar que es una devolución en el primer mensaje--------------------
    this.todosMensajes = this.chat.mensajes;
    this.firstMessage = this.chat.mensajes[0];
    if(this.firstMessage.includes(" - DEV/RCL: "+this.unPedido._id)){
      this.firstMessage = this.firstMessage.replace(" - DEV/RCL: "+this.unPedido._id, "");
    }
    this.todosMensajes[0] = this.todosMensajes[0].replace(this.chat.mensajes[0], this.firstMessage);
    //--------------------------------------------------------------------------
  }

  verProducto(id: number ){
    this.router.navigate(['/producto', this.chat.productoId]);
  }

  actualizarChat() {
      this.message = this.chatForm.controls['mensajes'].value;
      this.chatForm.controls['mensajes'].setValue(this.autor + this.message);
      this.chatService.actualizarChat( this.chatForm.value, this.chat._id )
      .subscribe( () => {
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      }, (err) => {
        console.log(err)
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  borrarChat( chat: Chat ) {
      this.chatService.borrarChat( chat._id )
          .subscribe( resp => {
            Swal.fire( 'Borrado', 'Chat borrado con éxito', 'success' );
          }, (err) => {
            console.log(err)
            Swal.fire('Error', 'Ha habido un problema', 'error');
          });
    }

}
