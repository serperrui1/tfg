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
  public compradorOProveedor:boolean = false;

  constructor(private incidenciaService : IncidenciaService,
    private router: Router) { }

    async ngOnInit() {
      this.incidencias = await (this.incidenciaService.getMisIncidencias());
      if(localStorage.getItem("usuario")== "comprador" || localStorage.getItem("usuario")== "proveedor" )
      {
        this.compradorOProveedor = true;
      }
    }
  
    verIncidencia(id: number ){
      this.router.navigate(['/incidencia', id]);
    }

}
