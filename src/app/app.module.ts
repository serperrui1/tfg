import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';




import { AppComponent} from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductoTarjetaComponent } from './components/producto-tarjeta/producto-tarjeta.component';
import { HomeComponent } from './components/home/home.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginaComponent } from './paginas/pagina.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RegisterCompradorComponent } from './auth/register-comprador/register-comprador.component';
import { RegisterProveedorComponent } from './auth/register-proveedor/register-proveedor.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductoTarjetaComponent,
    HomeComponent,
    ProductoComponent,
    PaginaComponent,
    NavbarComponent,
    RegisterCompradorComponent,
    RegisterProveedorComponent


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
