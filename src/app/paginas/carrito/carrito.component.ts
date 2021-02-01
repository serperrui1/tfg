import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{

  public costeLinea: number;
  public cantidad: number;
  public subtotal: number;
  public envio: number;
  public total: number;
  public impuestos: number;
  public direccionImagen = base_url+"/upload/productos/"

  public index: number;
  public cargando: boolean = true;
  public items: Producto[] = [];
  public cantidades: number[] = [];
  public products: Producto[] = [];
  public quantities: number[] = [];

  /* items = this.carritoService.getCarrito();
  cantidades = this.carritoService.getCantidades(); */
  
  
  constructor(private carritoService: CarritoService) {
    this.subtotal = 0;
    this.envio = 15;

  }
  
  async ngOnInit() {

    this.getEverything();

    /* for (let i = 0; i < this.items.length; i++) {
        this.cantidad = Number(this.cantidades[i]);
        console.log(this.cantidad);
        this.costeLinea = this.items[i].precio * (Number(this.cantidades[i]));
        this.subtotal = this.subtotal + this.costeLinea;
        this.impuestos = this.subtotal * 0.13;
        this.total = this.subtotal + this.envio + this.impuestos;
    } */
  }
  
  getEverything(){
    this.cargando = true;
    this.products = this.carritoService.getCarrito();
    this.quantities = this.carritoService.getCantidades();
    /* this.cargando = false; */
    this.items = this.products;
    this.cantidades = this.quantities;

    for (let i = 0; i < this.items.length; i++) {
      this.cantidad = Number(this.cantidades[i]);
      console.log(this.cantidad);
      this.costeLinea = this.items[i].precio * (Number(this.cantidades[i]));
      this.subtotal = this.subtotal + this.costeLinea;
      this.impuestos = this.subtotal * 0.13;
      this.total = this.subtotal + this.envio + this.impuestos;
    }
    this.cargando = false;
    /* console.log(this.items[0].imagenes[0]); */
  }

  borrarItem(i){
    this.cargando = true;
    this.index = i;
    this.items.splice(this.index, 1);
    this.cantidades.splice(this.index, 1);
    localStorage.setItem('items',JSON.stringify(this.items));
    localStorage.setItem('cantidades',JSON.stringify(this.cantidades));
    this.getEverything();

    location.reload();
    /* this.router.navigate(['/your-path']) */
  }
}

