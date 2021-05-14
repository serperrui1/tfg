import { Component, OnInit } from '@angular/core';
import { AsistenteTecnico } from '../../models/asistente';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-asistentes',
  templateUrl: './asistentes.component.html',
  styleUrls: ['./asistentes.component.css']
})
export class AsistentesComponent implements OnInit {

  public buscadorForm = this.fb.group({
    asistente:['']
  });

  public asistentes: AsistenteTecnico[] = [];

  constructor(private fb: FormBuilder,
    private usuarioService : UsuarioService) { }

    async ngOnInit() {
      this.asistentes = await (this.usuarioService.getAsistentes());
    }

    async buscar(){
      this.asistentes = await this.usuarioService.getBuscadorAsistentes(this.buscadorForm.value);
      this.updateDiv();
    }

    updateDiv(){ 
      $( "#asistentes" ).load(window.location.href + " #asistentes" );
    }

}
