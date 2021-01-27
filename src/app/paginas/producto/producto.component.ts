import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { DatosTecnicos } from '../../models/datosTecnicos';
import { ProductoService } from 'src/app/services/producto.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';


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
  public cantidad: number;
  public direccionImagen = base_url+"/upload/productos/"
  public items: Producto[] = [];
  public cantidades: number[] = [];
  public new: number;
  public contains:number = -1;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private carritoService: CarritoService,
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

  
  goEditIfProveedor() {
    this.router.navigate(['/actualizar-producto', this.id]);
  };

  alCarrito(producto) {
    this.cantidad = Number((document.getElementById("cantidad") as HTMLInputElement).value);
    console.log((document.getElementById("cantidad") as HTMLInputElement).value);

    this.items = this.carritoService.getCarrito();
    this.cantidades = this.carritoService.getCantidades();
    
    if(this.items === null){ // producto nuevo en cesta vacía -> no se comprueba nada
      this.carritoService.alCarrito(producto, this.cantidad);
      window.alert('¡El producto se ha añadido al carrito!');
    }

    else if(this.items != null){
       //hay algo en el carrito
      for (let i = 0; i < this.items.length; i++) {
        if((this.items[i]._id) === (this.producto._id)){
          this.contains = i;
        }
      }

      if(this.contains != -1){ //ya existe este producto en el carrito -> actualizamos su cantidad
        this.new = this.cantidades[this.contains] + this.cantidad; //dame el valor viejo y el nuevo que quiero meter del mismo producto y los sumamos
        this.cantidades.splice(this.contains, 1, this.new); //borramos su valor viejo y la actualizamos con la suma
        localStorage.setItem('cantidades',JSON.stringify(this.cantidades));
      }

      else { //añade la cantidad del nuevo producto al carrito
        this.carritoService.alCarrito(producto, this.cantidad);
        window.alert('¡El producto se ha añadido al carrito!');
      }

    }

    
  };



}



