import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';



import { AppComponent} from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LoginEmpleadoComponent } from './auth/login-empleado/login-empleado.component';
import { RegisterComponent } from './auth/register/register.component';
import { RegisterCompradorComponent } from './auth/register-comprador/register-comprador.component';
import { RegisterProveedorComponent } from './auth/register-proveedor/register-proveedor.component';
import { ProductoTarjetaComponent } from './components/producto-tarjeta/producto-tarjeta.component';
import { HomeComponent } from './paginas/home/home.component';
import { ProductoComponent } from './paginas/producto/producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginaComponent } from './paginas/pagina.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CompradorPerfilComponent } from './paginas/perfil/perfil.component';
import { MisProductosComponent } from './paginas/mis-productos/mis-productos.component';
import { CrearProductoComponent } from './paginas/crear-producto/crear-producto.component';
import { ActualizarProductoComponent } from './paginas/actualizar-producto/actualizar-producto.component';
import { SerCompradorComponent } from './paginas/ser-comprador/ser-comprador.component';
import { FaqsComponent } from './paginas/faqs/faqs.component';
import { CrearFaqComponent } from './paginas/crear-faq/crear-faq.component';
import { CarritoComponent } from './paginas/carrito/carrito.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginEmpleadoComponent,
    RegisterComponent,
    ProductoTarjetaComponent,
    HomeComponent,
    ProductoComponent,
    PaginaComponent,
    NavbarComponent,
    RegisterCompradorComponent,
    RegisterProveedorComponent,
    CompradorPerfilComponent,
    MisProductosComponent,
    CrearProductoComponent,
    ActualizarProductoComponent,
    SerCompradorComponent,
    FaqsComponent,
    CrearFaqComponent,
    CarritoComponent


  ],
  exports: [ ProductoTarjetaComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
