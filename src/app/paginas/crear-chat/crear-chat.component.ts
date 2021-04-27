import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { UsuarioService } from '../../services/usuario.service';
import { Comprador } from '../../models/comprador';
import { Proveedor } from '../../models/proveedor';
import Swal from 'sweetalert2';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crear-chat',
  templateUrl: './crear-chat.component.html',
  styleUrls: ['./crear-chat.component.css']
})
export class CrearChatComponent implements OnInit {

  public token: string;
  public usuario:string;
  formSubmited:boolean = false;
  public chatForm: FormGroup;
  public compradorNombre: string = "";
  public proveedorNombre: string = "";
  public proveedorId: string = "";
  public productoId: string = "";
  public comp: Comprador;
  public producto: Producto;
  public autor: string = "";
  public message: string = "";
  public chatId: string = "";

  constructor(private fb:FormBuilder,
    private chatService: ChatService,
    private productoService : ProductoService,
    private usuarioService: UsuarioService,
    private router: Router) {
      this.usuario =localStorage.getItem('usuario');
      this.token =localStorage.getItem('token');
     }

  async ngOnInit() {

    if(this.usuario === "comprador" && this.token != null){

      this.comp = await this.usuarioService.getComprador();
      this.compradorNombre = this.comp.nombre;
      this.proveedorNombre = JSON.parse(localStorage.getItem('proveedorNombre'));
      this.proveedorId = JSON.parse(localStorage.getItem('proveedorId'));
      this.productoId = JSON.parse(localStorage.getItem('productoId'));
      this.producto = await this.productoService.getProductoPorID(this.productoId);
      this.autor = this.compradorNombre.trim() + ": ";


      this.chatForm = this.fb.group({
        compradorId: [ this.comp.uid ],
        proveedorId: [ this.proveedorId ],
        productoId: [  this.productoId ],
        proveedorNombre: [ this.proveedorNombre ],
        mensajes: ['', Validators.required ],
      });
 
    } else{
      console.log("Para abrir un chat debes ser un comprador");
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
    this.chatForm.controls['mensajes'].setValue(this.autor + this.message);
    console.log(this.chatForm.value);

    const chatId = await this.chatService.crearChat(this.chatForm.value);
    if (chatId){
      Swal.fire('Guardado', 'Chat creado', 'success');
      this.router.navigateByUrl("/producto/" + this.productoId)
    }else{
      Swal.fire('Error', 'Error al crear chat', 'error');
    }
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


}
