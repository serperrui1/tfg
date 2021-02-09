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
  public compradorNombre: string = "";
  public prov: Proveedor;
  public producto: Producto;
  public autor: string = "";
  public message: string = "";
  public cont: number;
  public lastMessage: string = "";

  constructor(private fb:FormBuilder,
    private chatService: ChatService,
    private productoService : ProductoService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router) {
      this.usuario =localStorage.getItem('usuario');
      this.token =localStorage.getItem('token');
     }

  async ngOnInit() {

    this.activatedRoute.params.subscribe( params => {
      this.chatId = params['id']; 
    });

    this.chat = await this.chatService.getChatPorID(this.chatId);

    this.producto = await this.productoService.getProductoPorID(this.chat.productoId);

    this.compradorNombre = await this.usuarioService.getCompradorNombre(this.chat.compradorId);

    this.comp = await this.usuarioService.getComprador();
        if(this.comp === null){
          this.prov = await this.usuarioService.getProveedor();
        }
    
    if (this.token != null && (this.usuario === "comprador" && this.comp != null)){
      this.autor = this.comp.nombre + ": ";
      this.chatForm = this.fb.group({
        compradorId: [ this.chat.compradorId ],
        proveedorId: [ this.chat.proveedorId ],
        proveedorNombre: [ this.chat.proveedorNombre ],
        compradorNombre: [ this.comp.nombre],
        productoId: [  this.chat.productoId ],
        mensajes: ['', Validators.required ],
        fechaPublicacion: [ this.chat.fechaPublicacion ]
      });
      this.borradoNotificacion();
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
      this.borradoNotificacion();
    }

    else{
        console.log("Para ver un chat debes pertenecer a él");
    };
  }

  verProducto(id: number ){
    this.router.navigate(['/producto', this.chat.productoId]);
  }

  actualizarChat() {
      this.message = this.chatForm.controls['mensajes'].value;
      this.chatForm.controls['mensajes'].setValue(this.autor + this.message);
      //--------------------------------------------------------------------------------
      this.cont = JSON.parse(localStorage.getItem(this.chat._id));
      this.cont = this.cont + 1;
      localStorage.setItem(this.chat._id, JSON.stringify(this.cont));
      //--------------------------------------------------------------------------------
      this.chatService.actualizarChat( this.chatForm.value, this.chat._id )
      .subscribe( () => {
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      }, (err) => {
        console.log(err)
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  borradoNotificacion(){
    
    if(this.comp){
      this.lastMessage = this.chat.mensajes[this.chat.mensajes.length-1];
      if((this.lastMessage.indexOf(this.comp.nombre) != 0) && (JSON.parse(localStorage.getItem(this.chat._id)) != 0)){
        localStorage.setItem(this.chat._id, JSON.stringify(0));
        location.reload();
      }
    }

    if(this.prov){
      this.lastMessage = this.chat.mensajes[this.chat.mensajes.length-1];
      if((this.lastMessage.indexOf(this.prov.nombreEmpresa) != 0) && (JSON.parse(localStorage.getItem(this.chat._id)) != 0)){
        localStorage.setItem(this.chat._id, JSON.stringify(0));
        location.reload();
      }
    }

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
