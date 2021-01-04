import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { DatosTecnicos } from '../../models/datosTecnicos';
import { ProductoService } from 'src/app/services/producto.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup } from '@angular/forms';


const base_url = environment.base_url;


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  
  public productoForm: FormGroup;
  public producto: Producto;
  public imagenSubir: File;
  public imgTemp: any = null;
  public proveedor:string;
  public id: string;
  public direccionImagen = base_url+"/upload/productos/"

  constructor(private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private http: HttpClient,
    private usuarioService: UsuarioService){

  }

   async ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id']; 
    });
    this.producto= await this.productoService.getProductoPorID(this.id);
    this.proveedor = await this.usuarioService.getProveedorNombre(this.producto.proveedor)
    this.producto.proveedorNombre = this.proveedor;

    
  }


}
