import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Comprador } from '../../models/comprador';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-compradores',
  templateUrl: './compradores.component.html',
  styleUrls: ['./compradores.component.css']
})
export class CompradoresComponent implements OnInit {

  public buscadorForm = this.fb.group({
    comprador:['']
  });

  public compradores: Comprador[] = [];

  constructor(private usuarioService : UsuarioService,
    private fb: FormBuilder) { }

  async ngOnInit() {
    this.compradores = await (this.usuarioService.getCompradores());
  }

  async buscar(){
    this.compradores = await this.usuarioService.getBuscadorCompradores(this.buscadorForm.value);
    this.updateDiv();
  }

  updateDiv(){ 
    $( "#compradores" ).load(window.location.href + " #compradores" );
  }

}
