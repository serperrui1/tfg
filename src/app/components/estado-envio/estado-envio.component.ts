import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pedido } from 'src/app/models/pedido';
import { PedidosService } from 'src/app/services/pedidos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estado-envio',
  templateUrl: './estado-envio.component.html',
  styleUrls: ['./estado-envio.component.css']
})
export class EstadoEnvioComponent implements OnInit {

  constructor(
    @Inject( MAT_DIALOG_DATA) public data:Pedido,
    public pedidoService : PedidosService
  ) { }

  ngOnInit(): void {
  }

  marcarRecibido(){
    Swal.fire({
      text: '¿Desea confirmar la entrega del pedido?',
      showCancelButton: true,
      confirmButtonText: `Sí`, 
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoService.actualizarEnvio(this.data._id,"Entregado")
        
      }
    });
  }
}
