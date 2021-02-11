import { Component, OnInit } from '@angular/core';
import { Comprador } from 'src/app/models/comprador';
import { Producto } from 'src/app/models/producto';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';
import { Pedido } from 'src/app/models/pedido';
import { CompraService } from 'src/app/services/compra.service';
import { JsonpClientBackend } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

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

    this.datosPedidoForm = this.fb.group({
      nombre: [""],
      apellidos: [""],
      paisResidencia: [""],
      ciudad: [""],
      localidad: [""],
      codigoPostal: [""],
      direccionResidencia: [""],
      numeroTelefono: [""]
    });
}

comprar(){

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

  
      
    }else{
      Swal.fire('Error', 'no hay ');
    }


  }
  if(JSON.parse(localStorage.getItem('items'))=="")
  this.router.navigateByUrl('/');

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