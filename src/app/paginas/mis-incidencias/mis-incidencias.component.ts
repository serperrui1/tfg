import { Component, OnInit } from '@angular/core';
import { IncidenciaService } from '../../services/incidencia.service';
import { Router } from '@angular/router';
import { Incidencia } from '../../models/incidencia';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mis-incidencias',
  templateUrl: './mis-incidencias.component.html',
  styleUrls: ['./mis-incidencias.component.css']
})
export class MisIncidenciasComponent implements OnInit {

  public orden = this.fb.group({
    orden:['mensajesMasRecientes'],
  });

  public buscadorForm = this.fb.group({
    incidencia:['']
  });

  public incidencias: Incidencia[];
  public compradorOProveedor:boolean = false;

  constructor(private incidenciaService : IncidenciaService,
    private fb: FormBuilder,
    private router: Router) { }

    async ngOnInit() {
      this.incidencias = await (this.incidenciaService.getMisIncidencias());
      console.log(this.incidencias)
      if(localStorage.getItem("usuario")== "comprador" || localStorage.getItem("usuario")== "proveedor" )
      {
        this.compradorOProveedor = true;
      }
    }

    async ordenar(){
      if(this.orden.controls['orden'].value=="mensajesMasRecientes")
        this.incidencias.sort(((a, b) => (new Date(a.fechaPublicacion).getTime() < new Date(b.fechaPublicacion).getTime() ? 1 : -1)))
      else if(this.orden.controls['orden'].value=="mensajesMasAntiguos")
        this.incidencias.sort(((a, b) => (new Date(a.fechaPublicacion).getTime() > new Date(b.fechaPublicacion).getTime() ? 1 : -1)))
      else if(this.orden.controls['orden'].value=="asignadasPrimero")
        this.incidencias.sort(((a, b) => ( a.asignado.valueOf() === b.asignado.valueOf()  ? 1 : -1)))
      else if(this.orden.controls['orden'].value=="resueltasPrimero")
        this.incidencias.sort(((a, b) => ( a.resuelto.valueOf() === b.resuelto.valueOf()  ? 1 : -1)))
      else if(this.orden.controls['orden'].value=="noLeidasPrimero")
        this.incidencias.sort(((a, b) => ( a.leida.valueOf() === b.leida.valueOf()  ? 1 : -1)))
    }

  
    verIncidencia(id: number ){
      this.router.navigate(['/incidencia', id]);
    }

    async buscar(){
      this.incidencias = await this.incidenciaService.getBuscadorIncidencias(this.buscadorForm.value);
      this.updateDiv();
    }

    updateDiv(){ 
      $( "#incidencias" ).load(window.location.href + " #incidencias" );
    }

}
