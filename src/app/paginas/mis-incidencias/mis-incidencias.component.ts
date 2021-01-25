import { Component, OnInit } from '@angular/core';
import { IncidenciaService } from '../../services/incidencia.service';
import { Router } from '@angular/router';
import { Incidencia } from '../../models/incidencia';

@Component({
  selector: 'app-mis-incidencias',
  templateUrl: './mis-incidencias.component.html',
  styleUrls: ['./mis-incidencias.component.css']
})
export class MisIncidenciasComponent implements OnInit {

  public incidencias: Incidencia[];

  constructor(private incidenciaService : IncidenciaService,
    private router: Router) { }

    async ngOnInit() {
      this.incidencias = await (this.incidenciaService.getMisIncidencias());
      console.log(this.incidencias) 
    }
  
    verIncidencia(id: number ){
      this.router.navigate(['/incidencia', id]);
    }

}
