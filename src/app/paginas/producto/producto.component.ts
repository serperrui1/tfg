import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Producto } from '../../models/producto';
import { DatosTecnicos } from '../../models/datosTecnicos';
import { ProductoService } from 'src/app/services/producto.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { PedidosService } from '../../services/pedidos.service';
import { Comprador } from '../../models/comprador';
import { Pedido } from 'src/app/models/pedido';
import { Valoracion } from 'src/app/models/valoracion';
import Swal from 'sweetalert2';
import { Proveedor } from 'src/app/models/proveedor';
import { ChatService } from '../../services/chat.service';


const base_url = environment.base_url;


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  starRating = 0; 
  public productoForm: FormGroup;
  public valoracionForm: FormGroup;
  public producto: Producto;
  public proveedorId: string;
  public pedidoId: string;
  public misPedidos: Pedido[] = [];
  public compradorId: string;
  public valoradoPor: string;
  public imagenSubir: File;
  public imgTemp: any = null;
  public proveedor:string;
  public id: string;
  public cantidad: number;
  public direccionImagen = base_url+"/upload/productos/"
  public items: Producto[] = [];
  public cantidades: number[] = [];
  public nombres: string[] = [];
  /* public misChats: Chat[]; */
  public new: number;
  public estrellas: number;
  public contains:number = -1;
  public comp: Comprador;
  public token: string;
  public usuario:string;
  public flag: boolean = false;
  /* public noValora: boolean = false; */
  public prov:Proveedor;
  public yaValorado = false;
  public miValoracion :Valoracion;
  public imagenMostrar :string;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private pedidosService: PedidosService,
    private fb:FormBuilder,
    private chatService: ChatService){

     this.usuario =localStorage.getItem('usuario');
     this.token =localStorage.getItem('token');

  }


  async ngOnInit() {
    if (this.usuario =="proveedor"){
      this.prov = await this.usuarioService.getProveedor();
    }
    if (this.usuario =="comprador"){
      this.comp = await this.usuarioService.getComprador();
    }
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id']; 
    });
    this.producto = await this.productoService.getProductoPorID(this.id);
    this.producto.descripcion = this.producto.descripcion.replace(/(?:\r\n|\r|\n)/g, '\n');
    console.log(this.producto)
    this.imagenMostrar = this.producto.imagenes[0];
    for(let val of this.producto.valoraciones){
      this.valoradoPor = await this.usuarioService.getCompradorNombre(val.comprador);
      this.nombres.push(this.valoradoPor);
      /* console.log(this.nombres); */
      if(this.comp){
        if(val.comprador == this.comp.uid) {
        this.miValoracion = val;
        this.yaValorado= true      
      }
    }
      
    };
    

    this.proveedorId = this.producto.proveedor;
          

    this.productoForm = new FormGroup({
      cantidadProducto: new FormControl(this.producto.unidadesMinimas)
    });

    this.proveedor = await this.usuarioService.getProveedorNombre(this.producto.proveedor);
    this.producto.proveedorNombre = this.proveedor;

    this.productoForm.get('cantidadProducto').valueChanges.subscribe(val => {
      const formattedMessage = val;
      console.log(formattedMessage);
    });

    localStorage.setItem('productoId',JSON.stringify(this.producto._id));
    localStorage.setItem('proveedorId',JSON.stringify(this.producto.proveedor));
    localStorage.setItem('proveedorNombre',JSON.stringify(this.proveedor));

   
    if(this.comp != null){ //si el usuario viendo el producto es un comprador
      this.misPedidos = await this.pedidosService.getMisPedidos();
      for(let pedido of this.misPedidos){
        if (pedido.producto === this.producto._id){
          this.flag = true; // si yo he comprado este producto alguna vez
          this.pedidoId = pedido._id;
          this.valoracionForm = this.fb.group({

              comentario:[ ,[Validators.required]],
              puntuacion: ["0" , [Validators.required]]
          });
        }
      }
    }

    /* this.yaExisteDevolucion(); */
  }

  get cantidadProducto() {
     return this.productoForm.get('cantidadProducto').value; 
  }

  /* async yaExisteDevolucion(){
    this.misChats = await this.chatService.getMisChats();
    for(let chat of this.misChats){
      if(chat.mensajes[0].includes(" - DEV/RCL: "+this.pedidoId)){ //es una devolución
        this.noValora = true;
      }
    }
  } */

  
  borrarValoracion(valoracion:Valoracion) {
    Swal.fire({
        title: '¿Borrar esta valoración?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, borrarla'
      }).then((result) => {
        if (result.value) {
          let index= -1
         
          for(let i =0; i<this.producto.valoraciones.length; i++){
            if(this.producto.valoraciones[i].comprador == this.comp.uid){
                index = i;
              break;
            }
          }
  
      if (index != -1) {
        console.log(index);

        let data = {
          index
        }
        console.log(this.producto._id);
        this.productoService.borrarValoracion(data,this.producto._id)    .subscribe( () => {
          Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
        }, (err) => {
          console.log(err)
          Swal.fire('Error', err.error.msg, 'error');
        });
        
      }
    }
  })
  }

  getRating(rating :number) {
    this.estrellas = rating;      
  } 

  publicarValoracion() {
    /* if(this.comp){
      this.valoradoPor = this.valoracionForm.controls['comprador'].value;
      console.log(this.valoradoPor);
    } */
    this.valoracionForm.controls['puntuacion'].setValue(this.estrellas);
    this.productoService.crearValoracion( this.valoracionForm.value, this.producto._id )
    .subscribe( () => {
      Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      
    }, (err) => {
      console.log(err)
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  goEditIfProveedor() {
    this.router.navigate(['/actualizar-producto', this.id]);
  };

  comprar(producto){
    this.cantidad = Number((document.getElementById("cantidad") as HTMLInputElement).value);
    console.log((document.getElementById("cantidad") as HTMLInputElement).value);

    this.items = this.carritoService.getCarrito();
    this.cantidades = this.carritoService.getCantidades();
    
    if(this.items === null){ // producto nuevo en cesta vacía -> no se comprueba nada
      this.carritoService.alCarrito(producto, this.cantidad);
      window.alert('¡El producto se ha añadido al carrito!');
      this.cantidades = this.carritoService.getCantidades();
      location.reload();
      
    }

    else if(this.items != null){
       //hay algo en el carrito
      for (let i = 0; i < this.items.length; i++) {
        if((this.items[i]._id) === (this.producto._id)){
          this.contains = i;
        }
      }

      if(this.contains != -1){ //ya existe este producto en el carrito -> actualizamos su cantidad
        this.new = this.cantidades[this.contains] + this.cantidad; //dame el valor viejo y el nuevo que quiero meter del mismo producto y los sumamos
        this.cantidades.splice(this.contains, 1, this.new); //borramos su valor viejo y la actualizamos con la suma
        localStorage.setItem('cantidades',JSON.stringify(this.cantidades));
        window.alert('¡Ahora tienes '+ this.new +' artículos de este producto en el carrito!');
        this.cantidades = this.carritoService.getCantidades();
      }

      else { //añade la cantidad del nuevo producto al carrito
        this.carritoService.alCarrito(producto, this.cantidad);
        window.alert('¡El producto se ha añadido al carrito!');
        this.cantidades = this.carritoService.getCantidades();
      }
    this.router.navigateByUrl('/compra');
    }
  }

  alCarrito(producto) {
    this.cantidad = Number((document.getElementById("cantidad") as HTMLInputElement).value);
    console.log((document.getElementById("cantidad") as HTMLInputElement).value);

    this.items = this.carritoService.getCarrito();
    this.cantidades = this.carritoService.getCantidades();
    
    if(this.items === null){ // producto nuevo en cesta vacía -> no se comprueba nada
      this.carritoService.alCarrito(producto, this.cantidad);
      window.alert('¡El producto se ha añadido al carrito!');
      this.cantidades = this.carritoService.getCantidades();
      location.reload();
      
    }

    else if(this.items != null){
       //hay algo en el carrito
      for (let i = 0; i < this.items.length; i++) {
        if((this.items[i]._id) === (this.producto._id)){
          this.contains = i;
        }
      }

      if(this.contains != -1){ //ya existe este producto en el carrito -> actualizamos su cantidad
        this.new = this.cantidades[this.contains] + this.cantidad; //dame el valor viejo y el nuevo que quiero meter del mismo producto y los sumamos
        this.cantidades.splice(this.contains, 1, this.new); //borramos su valor viejo y la actualizamos con la suma
        localStorage.setItem('cantidades',JSON.stringify(this.cantidades));
        window.alert('¡Ahora tienes '+ this.new +' artículos de este producto en el carrito!');
        this.cantidades = this.carritoService.getCantidades();
        location.reload();
      }

      else { //añade la cantidad del nuevo producto al carrito
        this.carritoService.alCarrito(producto, this.cantidad);
        window.alert('¡El producto se ha añadido al carrito!');
        this.cantidades = this.carritoService.getCantidades();
        location.reload();
      }

    }

    
  };



}



