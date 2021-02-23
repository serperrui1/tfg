import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {
  public pedidos:Pedido[] = []

  constructor(private pedidosService: PedidosService) { }


  async ngOnInit(){
  this.pedidos = await this.pedidosService.getMisPedidos();

  }

} 
