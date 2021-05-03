import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto';
import { environment } from 'src/environments/environment';
import { UsuarioService } from 'src/app/services/usuario.service';

const base_url = environment.base_url;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  public esComprador = false;

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
  
  
  constructor(private carritoService: CarritoService,
    private usuarioService: UsuarioService) {
    this.subtotal = 0;
    this.envio = 15;

  }
  
  async ngOnInit() {
    this.esComprador = (localStorage.getItem('usuario') ==="comprador")
    this.getEverything();
  }
  
  getEverything(){
    this.cargando = true;
    this.products = this.carritoService.getCarrito();
    this.quantities = this.carritoService.getCantidades();
    this.items = this.products;
    this.cantidades = this.quantities;

    for (let i = 0; i < this.items.length; i++) {
      this.cantidad = Number(this.cantidades[i]);
      this.costeLinea = this.items[i].precio * (Number(this.cantidades[i]));
      this.subtotal = this.subtotal + this.costeLinea;
      this.impuestos = this.subtotal * 0.13;
      this.total = this.subtotal + this.envio + this.impuestos;
    }
    this.cargando = false;
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

