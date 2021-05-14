import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../models/proveedor';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  sector: string;
  /* public filtro = this.fb.group({
    sector:['']
  }); */
  public orden = this.fb.group({
    orden:['unidadesVendidasDescendente'],
  });
  public buscadorForm = this.fb.group({
    proveedor:[''],
    sector:['']
  });

  public proveedores: Proveedor[] = [];

  constructor(private usuarioService : UsuarioService,
    private router: Router,
    private fb: FormBuilder) { }

    async ngOnInit() {
      this.proveedores = await (this.usuarioService.getProveedores());
    }

    async ordenar(){
      if(this.orden.controls['orden'].value=="unidadesVendidasDescendente")
        this.proveedores.sort(((a, b) => (a.unidadesVendidas < b.unidadesVendidas) ? 1 : -1))
      else if(this.orden.controls['orden'].value=="puntuacionMediaDescendente")
        this.proveedores.sort(((a, b) => (a.puntuacionMedia < b.puntuacionMedia) ? 1 : -1))
    }

    async buscar(){
      this.proveedores = await this.usuarioService.getBuscadorProveedores(this.buscadorForm.value);
      this.updateDiv();
    }

    updateDiv(){ 
      $( "#proveedores" ).load(window.location.href + " #proveedores" );
    }

    verProveedor(id: number ){
      this.router.navigate(['/escaparate', id]);
    }

}
