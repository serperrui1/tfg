import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Incidencia } from '../../models/incidencia';
import { IncidenciaService } from '../../services/incidencia.service';
import { AsistenteTecnico } from '../../models/asistente';
import { Comprador } from '../../models/comprador';
import { Proveedor } from '../../models/proveedor';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-incidencia-tarjeta',
  templateUrl: './incidencia-tarjeta.component.html',
  styleUrls: ['./incidencia-tarjeta.component.css']
})

export class IncidenciaTarjetaComponent implements OnInit {

  public incidencia: Incidencia;
  @Input() data: Incidencia;
  @Output() incidenciaSeleccionada: EventEmitter<string>;
  public res:number = 0;
  public token: string;
  public usuario:string;
  public ultimoMensaje:string;
  public aT: AsistenteTecnico;
  public comp: Comprador;
  public prov: Proveedor;

  constructor(private incidenciaService: IncidenciaService,
    private usuarioService: UsuarioService) {
    this.incidenciaSeleccionada = new EventEmitter();
    this.usuario =localStorage.getItem('usuario');
    this.token =localStorage.getItem('token');
   }
  
  async ngOnInit() {
    this.incidencia = this.data;

    this.aT = await this.usuarioService.getAsistenteTecnico();
    if(this.aT === null){
      this.comp = await this.usuarioService.getComprador();
      if(this.comp === null){
        this.prov = await this.usuarioService.getProveedor();
      }
    }
    
    if(this.comp){
      this.ultimoMensaje = this.incidencia.mensajes[this.incidencia.mensajes.length-1];
      if(this.ultimoMensaje.indexOf(this.comp.nombre) != 0){ //si el último mensaje de la incidencia no contiene mi nombre en la posición 0
        this.res = JSON.parse(localStorage.getItem(this.incidencia._id)); //significa que me ha escrito el asistente
        //por tanto me muestro el número almacenado en localstorage para esta incidencia
      }
    }

    if(this.prov){
      this.ultimoMensaje = this.incidencia.mensajes[this.incidencia.mensajes.length-1];
      if(this.ultimoMensaje.indexOf(this.prov.nombreEmpresa) != 0){ //si el último mensaje de la incidencia no contiene mi nombre en la posición 0
        this.res = JSON.parse(localStorage.getItem(this.incidencia._id)); //significa que me ha escrito el asistente
        //por tanto me muestro el número almacenado en localstorage para esta incidencia
      }
    }

    if(this.aT && (this.incidencia.asistenteId === this.aT.uid)){
      this.ultimoMensaje = this.incidencia.mensajes[this.incidencia.mensajes.length-1];
      if(this.ultimoMensaje.indexOf(this.aT.nombre) != 0){ //si el último mensaje de la incidencia no contiene mi nombre en la posición 0
        this.res = JSON.parse(localStorage.getItem(this.incidencia._id)); //significa que me ha escrito el dueño de la incidencia
        //por tanto me muestro el número almacenado en localstorage para esta incidencia
      }
    }

    //si no se cumple alguna de esas condiciones no se me muestra nada, pues el último mensaje de esta incidencia es mío.

  }

  verIncidencia(){
    this.incidenciaSeleccionada.emit(this.incidencia._id);
  }

}
