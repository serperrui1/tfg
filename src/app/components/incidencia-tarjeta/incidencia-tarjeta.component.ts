import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Incidencia } from '../../models/incidencia';
import { IncidenciaService } from '../../services/incidencia.service';

@Component({
  selector: 'app-incidencia-tarjeta',
  templateUrl: './incidencia-tarjeta.component.html',
  styleUrls: ['./incidencia-tarjeta.component.css']
})

export class IncidenciaTarjetaComponent implements OnInit {

  public incidencia: Incidencia;
  @Input() data: Incidencia;
  @Output() incidenciaSeleccionada: EventEmitter<string>;

  constructor(private incidenciaService: IncidenciaService) {
    this.incidenciaSeleccionada = new EventEmitter();
   }
  
  async ngOnInit() {
    this.incidencia = this.data;
    /* console.log(this.id);
    this.incidencia= await this.incidenciaService.getIncidenciaPorID(this.id); */
  }

  verIncidencia(){
    this.incidenciaSeleccionada.emit(this.incidencia._id);
  }

}
