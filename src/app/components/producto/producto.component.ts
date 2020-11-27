import { Component } from '@angular/core';
import { Producto } from '../../models/producto';
import { DatosTecnicos } from '../../models/datosTecnicos';



@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent  {

  datosTecnicos:  DatosTecnicos[] = [{
    titulo : "producto1",
    descripcion : "descripción",
  }];

  producto: Producto = {
    titulo : "producto1",
    descripcion : "descripción",
    categoria :  "categoria1",
    subcategoria : "subcategoria1",
    undMinimas : 10,
    stock : 200,
    imagenes : ["./assets/images/EkDr-q8XYAg9Zj4.jpg"],
    precio : 2,
    datosTecnicos :  this.datosTecnicos,
    proveedorNombre : "empresa",
    proveedorId : "k9uhiytcrxe"
  };


}
