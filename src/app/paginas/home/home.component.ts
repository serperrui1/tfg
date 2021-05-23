import { Component, ElementRef, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  public productos: Producto[];
  public productosCopy: Producto[];
  public shuffled: Producto[] = [];
  public vistos: Producto[] = [];
  public ultimos3: Producto[] = [];
  public productosSegunCategoria: Producto[] = [];
  public idsArray: string[] = [];
  public categorias: string[] = [];
  public categoriasCopy: string[] = [];
  public noVistos:boolean = false;
  public noHayRelacionados:boolean = false;
  public productosMasVendidos: Producto[] = [];
  public productosMasValorados: Producto[] = [];
  public productosMejorValorados: Producto[] = [];
  public productosCategoria1: Producto[] = [];
  public productosCategoria2: Producto[] = [];
  public productosCategoria3: Producto[] = [];
  public productosCategoriaRandom1: Producto[] = [];
  public productosCategoriaRandom2: Producto[] = [];
  

  constructor(private productoService : ProductoService,
    private router: Router,
    private elementRef: ElementRef,
    private cookieService: CookieService) { }

  async ngOnInit() {

    /* this.cookieService.set('cookiesAceptadas', ""); */
    if(!this.cookieService.check('cookiesAceptadas')){
      Swal.fire({
        title: '<strong>COOKIES</strong>',
        icon: 'info',
        html: 'Utilizamos <b>cookies propias</b> para ofrecerte una mejor experiencia '+
        'y servicio, de acuerdo a tus hábitos de navegación.<br><b>¿Estás conforme?</b><br>'+
        'Puedes revisar nuestra política de cookies en nuestros '+
        '<a href="/terminos-uso-y-aviso-legal">términos de uso</a>.',
        /* showCloseButton: true, */
        showCancelButton: true,
        focusConfirm: false,
        position: 'bottom-end',
        allowOutsideClick: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Sí',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> No',
        cancelButtonAriaLabel: 'Thumbs down'
      }).then((result) => {
        if (result.isConfirmed) {
          this.cookieService.set('cookiesAceptadas', "Sí");
          console.log("cookies aceptadas")
        } else {
          this.cookieService.set('cookiesAceptadas', "No");
        }
      })
    }
    
    this.productos = await (this.productoService.getProductos());
    this.productosCopy = this.productos;
    this.shuffled = this.productos;
    console.log(this.shuffled);


    //COOKIE VISTOS RECIENTEMENTE
    if(this.cookieService.check('productosVistos')){
      var productosVistos:string = this.cookieService.get('productosVistos');
      if(productosVistos.includes(" ")){ //hay más de un producto visto
        this.idsArray = productosVistos.split(' ');


        for(let productoId of this.idsArray){
          var producto = await this.productoService.getProductoPorID(productoId);
          this.vistos.push(producto);
        }


        if(this.vistos.length > 2){
          var ultimo = this.vistos[this.vistos.length - 1];
          var penultimo = this.vistos[this.vistos.length - 2];
          var antepenultimo = this.vistos[this.vistos.length - 3];
          this.ultimos3.push(antepenultimo, penultimo, ultimo);
          
          var producto1Categoria = this.shuffled.find(element => 
            (!this.cookieService.get('productosVistos').includes(element._id)) && element.categoria == ultimo.categoria);
          var producto2Categoria = this.shuffled.find(element => 
            (!this.cookieService.get('productosVistos').includes(element._id)) && element.categoria == penultimo.categoria
            && element._id != producto1Categoria._id);
          var producto3Categoria = this.shuffled.find(element => 
            (!this.cookieService.get('productosVistos').includes(element._id)) && element.categoria == antepenultimo.categoria
            && element._id != producto1Categoria._id  && element._id != producto2Categoria._id);

          if(!producto1Categoria){
            this.noHayRelacionados = true;
          }else if (producto1Categoria && !producto2Categoria && !producto3Categoria){
            this.productosSegunCategoria.push(producto1Categoria);
            this.cookieService.set('productosVistos', ultimo._id);
          }else if (producto1Categoria && producto2Categoria && !producto3Categoria){
            this.productosSegunCategoria.push(producto1Categoria, producto2Categoria);
            this.cookieService.set('productosVistos', ultimo._id+' '+penultimo._id);
          }else{
            this.productosSegunCategoria.push(producto1Categoria, producto2Categoria, producto3Categoria);
            this.cookieService.set('productosVistos', ultimo._id+' '+penultimo._id+' '+antepenultimo._id);
          }

          
        }
        
        
        
        else if (this.vistos.length == 2){
          var ultimo = this.vistos[this.vistos.length - 1];
          var penultimo = this.vistos[this.vistos.length - 2];
          this.ultimos3.push(penultimo, ultimo);

          var producto1Categoria = this.shuffled.find(element => 
            (!this.cookieService.get('productosVistos').includes(element._id)) && element.categoria == ultimo.categoria);
          var producto2Categoria = this.shuffled.find(element => 
            (!this.cookieService.get('productosVistos').includes(element._id)) && element.categoria == penultimo.categoria
            && element._id != producto1Categoria._id);
          var producto3Categoria = this.shuffled.find(element => 
            (!this.cookieService.get('productosVistos').includes(element._id)) && element.categoria == ultimo.categoria
            && element._id != producto1Categoria._id  && element._id != producto2Categoria._id);

          /* if(!producto1Categoria){
            this.noHayRelacionados = true;
          }else if (producto1Categoria && !producto2Categoria){
            this.productosSegunCategoria.push(producto1Categoria);
            this.cookieService.set('productosVistos', ultimo._id);
          }else{
            this.productosSegunCategoria.push(producto1Categoria, producto2Categoria);
            this.cookieService.set('productosVistos', ultimo._id+' '+penultimo._id);
          } */

          if(!producto1Categoria){
            this.noHayRelacionados = true;
          }else if (producto1Categoria && !producto2Categoria && !producto3Categoria){
            this.productosSegunCategoria.push(producto1Categoria);
            this.cookieService.set('productosVistos', ultimo._id);
          }else if (producto1Categoria && producto2Categoria && !producto3Categoria){
            this.productosSegunCategoria.push(producto1Categoria, producto2Categoria);
            this.cookieService.set('productosVistos', ultimo._id+' '+penultimo._id);
          }else{
            this.productosSegunCategoria.push(producto1Categoria, producto2Categoria, producto3Categoria);
            this.cookieService.set('productosVistos', ultimo._id+' '+penultimo._id);
          }
        }

        this.ultimos3.reverse();



      } else { //solo existe un producto visto en la cookie
        var unaId:string = this.cookieService.get('productosVistos');
        var producto1 = await this.productoService.getProductoPorID(unaId);
        this.ultimos3.push(producto1);

        var producto1Categoria = this.shuffled.find(element => 
          (!this.cookieService.get('productosVistos').includes(element._id)) && element.categoria == producto1.categoria);
        var producto2Categoria = this.shuffled.find(element => 
          (!this.cookieService.get('productosVistos').includes(element._id)) && element.categoria == producto1.categoria
          && element._id != producto1Categoria._id);
        var producto3Categoria = this.shuffled.find(element => 
          (!this.cookieService.get('productosVistos').includes(element._id)) && element.categoria == producto1.categoria
          && element._id != producto1Categoria._id  && element._id != producto2Categoria._id);

        /* if(!producto1Categoria){
          this.noHayRelacionados = true;
        }else{
          this.productosSegunCategoria.push(producto1Categoria);
          this.cookieService.set('productosVistos', producto1._id);
        } */

        if(!producto1Categoria){
          this.noHayRelacionados = true;
        }else if (producto1Categoria && !producto2Categoria && !producto3Categoria){
          this.productosSegunCategoria.push(producto1Categoria);
          this.cookieService.set('productosVistos', producto1._id);
        }else if (producto1Categoria && producto2Categoria && !producto3Categoria){
          this.productosSegunCategoria.push(producto1Categoria, producto2Categoria);
          this.cookieService.set('productosVistos', producto1._id);
        }else{
          this.productosSegunCategoria.push(producto1Categoria, producto2Categoria, producto3Categoria);
          this.cookieService.set('productosVistos', producto1._id);
        }




      }

    } else {
      this.noVistos = true;
    }

    if(this.productosSegunCategoria.length != 0){ // si hay cookies
      //Mas vendidos, mas valorados y mejor valorados personalizados.
      for (let producto of this.productosSegunCategoria){
        console.log(1)
        this.categorias.push(producto.categoria)

        //quitar categorias duplicadas-------------
        const uniqueSet = new Set(this.categorias);
        this.categorias = [...uniqueSet];
        //------------------------------------------
        
        console.log(this.categorias);
      }
  
      if (this.categorias.length == 1){ //solo hay una categoria
        this.productosMasVendidos = (await this.productoService.getProductos()).filter((e) => e.categoria == this.categorias[0]);
        this.productosMasVendidos.sort(((a, b) => (a.unidadesVendidas < b.unidadesVendidas) ? 1 : -1));
        this.productosMasVendidos = this.productosMasVendidos.slice(0, 3);
  
        this.productosMasValorados = (await this.productoService.getProductos()).filter((e) => e.categoria == this.categorias[0]);
        this.productosMasValorados.sort(((a, b) => (a.valoraciones.length < b.valoraciones.length) ? 1 : -1))
        this.productosMasValorados = this.productosMasValorados.slice(0, 3);
    
        this.productosMejorValorados = (await this.productoService.getProductos()).filter((e) => e.categoria == this.categorias[0]);
        this.productosMejorValorados.sort(((a, b) => (a.puntuacionMedia < b.puntuacionMedia) ? 1 : -1))
        this.productosMejorValorados = this.productosMejorValorados.slice(0, 3);

        this.productosCategoria1 = (await this.productoService.getProductos()).filter((e) => e.categoria == this.categorias[0]);
        this.shuffle(this.productosCategoria1);
        this.productosCategoria1 = this.productosCategoria1.slice(0, 3);
      }
  
      if (this.categorias.length == 2){ //hay dos categorias
        this.productosMasVendidos = (await this.productoService.getProductos()).filter((e) => e.categoria == this.categorias[0] || e.categoria == this.categorias[1]);
        this.productosMasVendidos.sort(((a, b) => (a.unidadesVendidas < b.unidadesVendidas) ? 1 : -1));
        this.productosMasVendidos = this.productosMasVendidos.slice(0, 3);
  
        this.productosMasValorados = (await this.productoService.getProductos()).filter((e) => e.categoria == this.categorias[0] || e.categoria == this.categorias[1]);
        this.productosMasValorados.sort(((a, b) => (a.valoraciones.length < b.valoraciones.length) ? 1 : -1))
        this.productosMasValorados = this.productosMasValorados.slice(0, 3);
    
        this.productosMejorValorados = (await this.productoService.getProductos()).filter((e) => e.categoria == this.categorias[0] || e.categoria == this.categorias[1]);
        this.productosMejorValorados.sort(((a, b) => (a.puntuacionMedia < b.puntuacionMedia) ? 1 : -1))
        this.productosMejorValorados = this.productosMejorValorados.slice(0, 3);

        this.productosCategoria1 = (await this.productoService.getProductos()).filter((e) => e.categoria == this.categorias[0]);
        this.shuffle(this.productosCategoria1);
        this.productosCategoria1 = this.productosCategoria1.slice(0, 3);

        this.productosCategoria2 = (await this.productoService.getProductos()).filter((e) => e.categoria == this.categorias[1]);
        this.shuffle(this.productosCategoria2);
        this.productosCategoria2 = this.productosCategoria2.slice(0, 3);
      }
  
      if (this.categorias.length >= 3){
        this.productosMasVendidos = (await this.productoService.getProductos()).filter((e) => e.categoria == this.categorias[0] || e.categoria == this.categorias[1] || e.categoria == this.categorias[2]);
        this.productosMasVendidos.sort(((a, b) => (a.unidadesVendidas < b.unidadesVendidas) ? 1 : -1));
        this.productosMasVendidos = this.productosMasVendidos.slice(0, 3);
  
        this.productosMasValorados = (await this.productoService.getProductos()).filter((e) => e.categoria == this.categorias[0] || e.categoria == this.categorias[1] || e.categoria == this.categorias[2]);
        this.productosMasValorados.sort(((a, b) => (a.valoraciones.length < b.valoraciones.length) ? 1 : -1))
        this.productosMasValorados = this.productosMasValorados.slice(0, 3);
    
        this.productosMejorValorados = (await this.productoService.getProductos()).filter((e) => e.categoria == this.categorias[0] || e.categoria == this.categorias[1] || e.categoria == this.categorias[2]);
        this.productosMejorValorados.sort(((a, b) => (a.puntuacionMedia < b.puntuacionMedia) ? 1 : -1))
        this.productosMejorValorados = this.productosMejorValorados.slice(0, 3);

        this.productosCategoria1 = (await this.productoService.getProductos()).filter((e) => e.categoria == this.categorias[0]);
        this.shuffle(this.productosCategoria1);
        this.productosCategoria1 = this.productosCategoria1.slice(0, 3);

        this.productosCategoria2 = (await this.productoService.getProductos()).filter((e) => e.categoria == this.categorias[1]);
        this.shuffle(this.productosCategoria2);
        this.productosCategoria2 = this.productosCategoria2.slice(0, 3);

        this.productosCategoria3 = (await this.productoService.getProductos()).filter((e) => e.categoria == this.categorias[2]);
        this.shuffle(this.productosCategoria3);
        this.productosCategoria3 = this.productosCategoria3.slice(0, 3);
      }
    }

    else if(this.productosSegunCategoria.length == 0){ // no hay cookies
      //Mas vendidos, mas valorados y mejor valorados genéricos.
      this.productosMasVendidos = await this.productoService.getProductos();
      this.productosMasVendidos.sort(((a, b) => (a.unidadesVendidas < b.unidadesVendidas) ? 1 : -1));
      this.productosMasVendidos = this.productosMasVendidos.slice(0, 3);
      
      this.productosMasValorados = await this.productoService.getProductos();
      this.productosMasValorados.sort(((a, b) => (a.valoraciones.length < b.valoraciones.length) ? 1 : -1))
      this.productosMasValorados = this.productosMasValorados.slice(0, 3);
  
      this.productosMejorValorados = await this.productoService.getProductos();
      this.productosMejorValorados.sort(((a, b) => (a.puntuacionMedia < b.puntuacionMedia) ? 1 : -1))
      this.productosMejorValorados = this.productosMejorValorados.slice(0, 3);


      for (let producto of this.productosCopy){
        this.categoriasCopy.push(producto.categoria);
      }

      this.shuffle(this.categoriasCopy);
      var categoria = this.categoriasCopy[Math.floor(Math.random() * this.categoriasCopy.length)];
      this.productosCategoriaRandom1 = (await this.productoService.getProductos()).filter((e) => e.categoria == categoria);
      this.shuffle(this.productosCategoriaRandom1);
      this.productosCategoriaRandom1 = this.productosCategoriaRandom1.slice(0, 3);

      this.shuffle(this.categoriasCopy);
      var categoria2 = this.categoriasCopy.find(element => element != categoria);
      this.productosCategoriaRandom2 = (await this.productoService.getProductos()).filter((e) => e.categoria == categoria2);
      this.shuffle(this.productosCategoriaRandom2);
      this.productosCategoriaRandom2 = this.productosCategoriaRandom2.slice(0, 3);

  

      
    }

  }

  verProducto(id: number ){
    this.router.navigate(['/producto', id]);
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }

}
