import { Component, OnInit } from '@angular/core';
import { Incidencia } from '../../models/incidencia';
import { IncidenciaService } from '../../services/incidencia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styles: [
  ]
})
export class IncidenciasComponent implements OnInit {

  public incidencias: Incidencia[] = [];

  constructor(private incidenciaService : IncidenciaService,
    private router: Router) { }

  async ngOnInit() {
    this.incidencias = await (this.incidenciaService.getIncidencias());
    console.log(this.incidencias);
  }

  verIncidencia(id: number ){
    this.router.navigate(['/incidencia', id]);
  }

}
