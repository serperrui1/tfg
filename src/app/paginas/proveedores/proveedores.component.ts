import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../models/proveedor';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  sector: string = "";
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
  public nombre:string ="";
  public proveedores: Proveedor[] = [];

  constructor(private usuarioService : UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }

    async ngOnInit() {
      this.activatedRoute.params.subscribe(async params =>{
        
        
        if(params['nombre']){
          if(params['nombre']=="todos"){
            this.nombre = "";
          }else{
            this.nombre = params['nombre'];
          }
          this.buscadorForm.controls['proveedor'].setValue(this.nombre);

        }if(params['sector']){
          if(params['sector']=="todos"){
            this.sector = "";
          }else {
            this.sector = params['sector'].replace("%20", " ");
          }
          this.buscadorForm.controls['sector'].setValue(this.sector);
          
        }
        this.proveedores = await this.usuarioService.getBuscadorProveedores(this.buscadorForm.value);    

        console.log(this.nombre);
        console.log(this.sector);

      })}

    async ordenar(){
      if(this.orden.controls['orden'].value=="unidadesVendidasDescendente")
        this.proveedores.sort(((a, b) => (a.unidadesVendidas < b.unidadesVendidas) ? 1 : -1))
      else if(this.orden.controls['orden'].value=="puntuacionMediaDescendente")
        this.proveedores.sort(((a, b) => (a.puntuacionMedia < b.puntuacionMedia) ? 1 : -1))
    }

    async buscar(){
      console.log(this.nombre);
        console.log(this.sector);
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
