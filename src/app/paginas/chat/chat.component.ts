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
import { SpamValidator } from '../../Validaciones-Customizadas.directive';
import { Spam } from '../../models/spam';
import { SpamService } from '../../services/spam.service';

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
  public apellidosComprador: string;
  public message: string = "";
  public pedidoId: string = "";
  public cont: number;
  public esQueja: boolean = false;
  public lastMessage: string = "";
  public firstMessage: string = "";
  public direccionImagen = base_url+"/upload/productos/";
  public ultimoNombre = "";
  public imagenMostrar:string;
  public spam: Spam;
  public expresionesSpam: string[];
  imagenFirebase:boolean= false;
  imagenesDeFirebase:boolean[]=[];

  constructor(private fb:FormBuilder,
    private chatService: ChatService,
    private productoService : ProductoService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private pedidosService: PedidosService,
    private spamService: SpamService,
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
        console.log(this.pedidoId);
        this.unPedido = await this.pedidosService.getPedidoPorID(this.pedidoId);
        console.log(this.unPedido);
        this.flag = true;
      }
    }
    console.log(this.flag);

    this.ultimoNombre = this.chat.mensajes[this.chat.mensajes.length - 1].substring(0,this.chat.mensajes[this.chat.mensajes.length - 1].indexOf(":"));
    console.log(this.ultimoNombre);
    //----------------------------------------------------------------
    this.producto = await this.productoService.getProductoPorID(this.chat.productoId);
    console.log(this.producto);
    this.compradorNombre = await this.usuarioService.getCompradorNombre(this.chat.compradorId);
    console.log(this.compradorNombre);
    this.comp = await this.usuarioService.getComprador();
    console.log(this.comp);
    if(this.comp === null){
      this.prov = await this.usuarioService.getProveedor();
      var compradores = (await this.usuarioService.getCompradores()).filter((e) => e.uid == this.chat.compradorId);
      this.apellidosComprador = compradores[0].apellidos;
    }
    
    if (this.token != null && (this.usuario === "comprador" && this.comp != null)){
      this.autor = this.comp.nombre.trim() + " " + this.comp.apellidos + ": ";
      this.spam = (await this.spamService.getSpam())[0];
      this.expresionesSpam = this.spam.expresiones;
      this.chatForm = this.fb.group({
        compradorId: [ this.chat.compradorId ],
        proveedorId: [ this.chat.proveedorId ],
        proveedorNombre: [ this.chat.proveedorNombre ],
        compradorNombre: [ this.comp.nombre],
        productoId: [  this.chat.productoId ],
        mensajes: ['', [Validators.required, SpamValidator(this.expresionesSpam)]],
        fechaPublicacion: [ this.chat.fechaPublicacion ]
      });
      this.chat = await this.chatService.chatLeido(this.chatId);
    }

    if (this.token != null && (this.usuario === "proveedor" && this.prov != null)){
      this.autor = this.prov.nombreEmpresa + ": ";
      this.spam = (await this.spamService.getSpam())[0];
      this.expresionesSpam = this.spam.expresiones;
      this.chatForm = this.fb.group({
        compradorId: [ this.chat.compradorId ],
        proveedorId: [ this.chat.proveedorId ],
        proveedorNombre: [ this.chat.proveedorNombre ],
        compradorNombre: [ this.compradorNombre],
        productoId: [  this.chat.productoId ],
        mensajes: ['', [Validators.required, SpamValidator(this.expresionesSpam)]],
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

    for(let i =0;i <= this.producto.imagenes.length -1; i++){
      if(this.producto.imagenes[i].startsWith("https")){
        this.imagenesDeFirebase.push(true);
      }else{
        this.imagenesDeFirebase.push(false);
      }
    if(this.producto.imagenes[0].startsWith("https")){
      this.imagenFirebase = true;
    }else{
      this.imagenFirebase = false;
    }
    this.imagenMostrar = this.producto.imagenes[0];
    }
  }

  get mensajes()
  {
    return this.chatForm.get('mensajes');
  }

  verProducto(id: number ){
    this.router.navigate(['/producto', this.chat.productoId]);
  }

  actualizarChat() {
    if(this.chatForm.invalid){
      this.chatForm.markAllAsTouched()
      return;
    }
      this.message = this.chatForm.controls['mensajes'].value;
      this.chatForm.controls['mensajes'].setValue(this.autor + this.message);
      this.chatService.actualizarChat( this.chatForm.value, this.chat._id )
      .subscribe( () => {
        Swal.fire('Guardado', 'Mensaje enviado.', 'success');
        /* this.router.navigateByUrl('/chat/'+this.chat._id); */
        location.reload();
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  borrarChat( chat: Chat ) {
      this.chatService.borrarChat( chat._id )
          .subscribe( resp => {
            Swal.fire( 'Borrado', 'Chat borrado.', 'success' );
            this.router.navigateByUrl('/mis-chats');
          }, (err) => {
            Swal.fire('Error', 'Ha habido un problema.', 'error');
          });
  }

  //Validaciones
  get mensajeNoValido(){
    return this.mensajeCampoRequerido
  }
  get mensajeCampoRequerido(){
    return this.chatForm.get('mensajes').errors ? this.chatForm.get('mensajes').errors.required && this.chatForm.get('mensajes').touched : null
  }

}
