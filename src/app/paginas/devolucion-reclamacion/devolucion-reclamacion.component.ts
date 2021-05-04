import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comprador } from '../../models/comprador';
import { Producto } from '../../models/producto';
import { ChatService } from '../../services/chat.service';
import { ProductoService } from '../../services/producto.service';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SpamValidator } from '../../Validaciones-Customizadas.directive';
import { Spam } from '../../models/spam';
import { SpamService } from '../../services/spam.service';
import { Pedido } from '../../models/pedido';
import { PedidosService } from '../../services/pedidos.service';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Component({
  selector: 'app-devolucion-reclamacion',
  templateUrl: './devolucion-reclamacion.component.html',
  styleUrls: ['./devolucion-reclamacion.component.css']
})
export class DevolucionReclamacionComponent implements OnInit {

  public token: string;
  public usuario:string;
  formSubmited:boolean = false;
  public chatForm: FormGroup;
  public compradorNombre: string = "";
  public proveedorNombre: string = "";
  public flag: boolean = false;
  public misPedidos: Pedido[] = [];
  public proveedorId: string = "";
  public productoId: string = "";
  public unPedido: Pedido;
  public comp: Comprador;
  public producto: Producto;
  public autor: string = "";
  public message: string = "";
  public chatId: string = "";
  public pedidoId: string = "";
  public solicitud: string = "";
  public spam: Spam;
  public expresionesSpam: string[];
  public direccionImagen = base_url+"/upload/productos/";

  constructor(private fb:FormBuilder,
    private chatService: ChatService,
    private productoService : ProductoService,
    private usuarioService: UsuarioService,
    private pedidosService: PedidosService,
    private spamService: SpamService,
    private router: Router) {
      this.usuario =localStorage.getItem('usuario');
      this.token =localStorage.getItem('token');
     }

  async ngOnInit() {

    this.comp = await this.usuarioService.getComprador();
    if(this.comp != null){ //si el usuario viendo el producto es un comprador
      this.productoId = JSON.parse(localStorage.getItem('productoId'));
      this.producto = await this.productoService.getProductoPorID(this.productoId);
      this.misPedidos = await this.pedidosService.getMisPedidos();
      for(let pedido of this.misPedidos){
        if (pedido.producto === this.producto._id){
          this.pedidoId = pedido._id;
          this.flag = true; // si yo he comprado este producto alguna vez
          this.solicitud = " - DEV/RCL: "+pedido._id;
          this.unPedido = await this.pedidosService.getPedidoPorID(pedido._id);
        }
      }
    }

    if(this.flag){
      this.compradorNombre = this.comp.nombre;
      this.proveedorNombre = JSON.parse(localStorage.getItem('proveedorNombre'));
      this.proveedorId = JSON.parse(localStorage.getItem('proveedorId'));
      this.autor = this.compradorNombre + ": ";
      this.spam = (await this.spamService.getSpam())[0];
      this.expresionesSpam = this.spam.expresiones;
      
      this.chatForm = this.fb.group({
        compradorId: [ this.comp.uid ],
        proveedorId: [ this.proveedorId ],
        productoId: [  this.productoId ],
        proveedorNombre: [ this.proveedorNombre ],
        mensajes: ['', [Validators.required, SpamValidator(this.expresionesSpam)] ],
      });
      
    } else{
      console.log("Para solicitar una devolución o reclamación debes haber comprado este producto ántes");
    };

  }

  verProducto(id: number ){
    this.router.navigate(['/producto', this.productoId]);
  }

  async crearChat(){
    if(this.chatForm.invalid){
      this.chatForm.markAllAsTouched()
      return;
    }
    this.formSubmited = true;
    this.message = this.chatForm.controls['mensajes'].value;
    this.chatForm.controls['mensajes'].setValue(this.autor + this.message + this.solicitud);

    const chatId = await this.chatService.crearChat(this.chatForm.value);
    localStorage.setItem(chatId, JSON.stringify(1));
    /* location.reload(); */
    if (chatId){
      Swal.fire('Guardado', 'Solicitud enviada.', 'success');
      this.router.navigateByUrl('/mis-chats');
    }else{
      Swal.fire('Error', 'Error al enviar solicitud', 'error');
    }
    location.reload();
  }

  campoNoValido (campo:string) :boolean{
    if(this.chatForm.get(campo).invalid && this.formSubmited){
      return true;
    }else{
      return false;
    }
  }

  //Validaciones
  get mensajeNoValido(){
    return this.mensajeCampoRequerido
  }
  get mensajeCampoRequerido(){
    return this.chatForm.get('mensajes').errors ? this.chatForm.get('mensajes').errors.required && this.chatForm.get('mensajes').touched : null
  }
  get mensajes(){
    return this.chatForm.get('mensajes');
  }


}

