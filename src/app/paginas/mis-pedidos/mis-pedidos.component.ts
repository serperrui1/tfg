import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { PedidosService } from 'src/app/services/pedidos.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {

  public orden = this.fb.group({
    orden:['pedidosMasRecientes'],
  });

  public buscadorForm = this.fb.group({
    pedido:['']
  });

  public pedidos: Pedido[] = []

  constructor(private pedidosService: PedidosService,
    private fb: FormBuilder,) { }

  async ngOnInit(){
  this.pedidos = await this.pedidosService.getMisPedidos();

  }

  async ordenar(){
    if(this.orden.controls['orden'].value=="unidadesAscendente")
      this.pedidos.sort(((a, b) => (a.unidades < b.unidades) ? 1 : -1))
    else if(this.orden.controls['orden'].value=="unidadesDescendente")
      this.pedidos.sort(((a, b) => (a.unidades > b.unidades) ? 1 : -1))
    else if(this.orden.controls['orden'].value=="pedidosMasRecientes")
      this.pedidos.sort(((a, b) => (new Date(a.fechaCompra).getTime() < new Date(b.fechaCompra).getTime() ? 1 : -1)))
    else if(this.orden.controls['orden'].value=="pedidosMasAntiguos")
      this.pedidos.sort(((a, b) => (new Date(a.fechaCompra).getTime() > new Date(b.fechaCompra).getTime() ? 1 : -1)))
    else if(this.orden.controls['orden'].value=="precioAscendente")
      this.pedidos.sort(((a, b) => (a.precio < b.precio) ? 1 : -1))
    else if(this.orden.controls['orden'].value=="precioDescendente")
      this.pedidos.sort(((a, b) => (a.precio > b.precio) ? 1 : -1))
  } 

} 
