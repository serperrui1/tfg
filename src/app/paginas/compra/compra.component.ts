import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Comprador } from 'src/app/models/comprador';
import { Producto } from 'src/app/models/producto';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';
import { Pedido } from 'src/app/models/pedido';
import { CompraService } from 'src/app/services/compra.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';


declare var paypal;
@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  public comprador: Comprador;
  public direccionEnvio:string;
  public productos:Producto[] =[];
  public cantidades:number[] =[];
  public pedido:Pedido = new Pedido();
  public datosPedidoForm: FormGroup;
  nuevoComprador:boolean = false;
  public precioTotal = 0;

  @ViewChild('paypal',{ static:true}) paypalElement:ElementRef;

  constructor(private usuarioService: UsuarioService,
    private carritoSercice: CarritoService,
    private compraService :CompraService,
    private router:Router,
    private fb: FormBuilder) { }

  async ngOnInit(){
    this.comprador = await this.usuarioService.getComprador();
    this.direccionEnvio = this.comprador.direccionResidencia+", "+this.comprador.localidad+", "+this.comprador.ciudad+", "+this.comprador.paisResidencia
    for(let producto of JSON.parse(localStorage.getItem("items"))){
      this.productos.push(producto)
    }
    for(let cantidad of JSON.parse(localStorage.getItem("cantidades"))){
      this.cantidades.push(cantidad)
    }
    for(let i = 0; i< this.productos.length; i++){
      this.precioTotal = this.precioTotal + (this.productos[i].precio * this.cantidades[i]);
      if(this.productos[i].unidadesMinimas>this.cantidades[i] || this.productos[i].stock<this.cantidades[i]){
        this.quitarDelCarrito(i)
        Swal.fire('Error', 'no hay suficiente stock de' + this.productos[i].titulo).then((result) => {
          location.reload();
        });

      }
    }

    this.datosPedidoForm = this.fb.group({
      nuevoComprador:[this.nuevoComprador],
      nombre: [""],
      apellidos: [""],
      paisResidencia: [""],
      ciudad: [""],
      localidad: [""],
      codigoPostal: [""],
      direccionResidencia: [""],
      numeroTelefono: [""]
    });

    paypal.Buttons({
    createOrder: (data, actions)=>{
      return actions.order.create({
        purchase_units:[
          {
            amount :{
                value         : this.precioTotal,
                currency: 'EUR'
            }
          }
        ]
      })
    },
    onApprove: async (data, actions)=>{
     // const order = await actions.order.capture;
      console.log(actions);
      this.comprar();
    },
    onError: err =>{
      console.log(err);
    }
    }).render(this.paypalElement.nativeElement);
}

comprar(){
  if(this.nuevoComprador){
    let nuevaDireccion = this.datosPedidoForm.value;
    for(let i = this.productos.length -1 ; i>=0 ; i--){

      if(this.productos[i].unidadesMinimas<=this.cantidades[i] && this.productos[i].stock>=this.cantidades[i]){
        this.pedido.direccionEnvio = nuevaDireccion.direccionResidencia+", "+nuevaDireccion.localidad+", "+nuevaDireccion.ciudad+", "+nuevaDireccion.paisResidencia
        this.pedido.codigoPostal = nuevaDireccion.codigoPostal;
        this.pedido.nombreComprador = nuevaDireccion.nombre +" "+ nuevaDireccion.apellidos;
        this.pedido.numeroTelefono = nuevaDireccion.numeroTelefono;
        this.pedido.producto = this.productos[i]._id;
        this.pedido.unidades = this.cantidades[i];
        this.pedido.precio = this.productos[i].precio * this.cantidades[i];
        this.pedido.proveedor = this.productos[i].proveedor;
        this.compraService.crearPedido(this.pedido);
        
        this.quitarDelCarrito(i)
  
        Swal.fire('éxito', 'se realizo el pedido', 'success');
        this.router.navigateByUrl('/mis-pedidos');
      }else{
        Swal.fire('Error', 'no se ha podido realizar el pedido');
      }
    }

  }
  else{
    for(let i = this.productos.length -1 ; i>=0 ; i--){

      if(this.productos[i].unidadesMinimas<=this.cantidades[i] && this.productos[i].stock>=this.cantidades[i]){
        console.log(this.direccionEnvio);
        this.pedido.direccionEnvio = this.direccionEnvio;
        this.pedido.codigoPostal = this.comprador.codigoPostal;
        this.pedido.nombreComprador = this.comprador.nombre + this.comprador.apellidos;
        this.pedido.numeroTelefono = this.comprador.numeroTelefono;
        this.pedido.producto = this.productos[i]._id;
        this.pedido.unidades = this.cantidades[i];
        this.pedido.precio = this.productos[i].precio * this.cantidades[i];
        this.pedido.proveedor = this.productos[i].proveedor;
        console.log(this.pedido)
        this.compraService.crearPedido(this.pedido);
        
        this.quitarDelCarrito(i)
  
    
        Swal.fire('éxito', 'se realizo el pedido', 'success');
        this.router.navigateByUrl('/mis-pedidos');
        
      }else{
        Swal.fire('Error', 'no se ha podido realizar el pedido');
      }
  
  
    }
    // if(JSON.parse(localStorage.getItem('items'))=="")
    // this.router.navigateByUrl('/');
  
  }
  
}

  quitarDelCarrito(i:number){
    let items = JSON.parse(localStorage.getItem("items"));
    items.splice(i, 1);

    let cantidades = JSON.parse(localStorage.getItem("cantidades"));
    cantidades.splice(i, 1);


    localStorage.removeItem('items');
    localStorage.removeItem('cantidades');
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('cantidades', JSON.stringify(cantidades));
  }

}