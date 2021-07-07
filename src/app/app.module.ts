import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireModule } from "@angular/fire";




import { AppComponent} from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LoginEmpleadoComponent } from './auth/login-empleado/login-empleado.component';
import { RegisterComponent } from './auth/register/register.component';
import { RegisterCompradorComponent } from './auth/register-comprador/register-comprador.component';
import { RegisterProveedorComponent } from './auth/register-proveedor/register-proveedor.component';
import { ProductoTarjetaComponent } from './components/producto-tarjeta/producto-tarjeta.component';
import { HomeComponent } from './paginas/home/home.component';
import { ProductoComponent } from './paginas/producto/producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginaComponent } from './paginas/pagina.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { perfilComponent } from './paginas/perfil/perfil.component';
import { MisProductosComponent } from './paginas/mis-productos/mis-productos.component';
import { CrearProductoComponent } from './paginas/crear-producto/crear-producto.component';
import { ActualizarProductoComponent } from './paginas/actualizar-producto/actualizar-producto.component';
import { SerCompradorComponent } from './paginas/ser-comprador/ser-comprador.component';
import { FaqsComponent } from './paginas/faqs/faqs.component';
import { CrearFaqComponent } from './paginas/crear-faq/crear-faq.component';
import { CarritoComponent } from './paginas/carrito/carrito.component';
import { IncidenciasComponent } from './paginas/incidencias/incidencias.component';
import { IncidenciaComponent } from './paginas/incidencia/incidencia.component';
import { IncidenciaTarjetaComponent } from './components/incidencia-tarjeta/incidencia-tarjeta.component';
import { CrearIncidenciaComponent } from './paginas/crear-incidencia/crear-incidencia.component';
import { MisIncidenciasComponent } from './paginas/mis-incidencias/mis-incidencias.component';
import { BuscadorComponent } from './paginas/buscador/buscador.component';
import { MisChatsComponent } from './paginas/mis-chats/mis-chats.component';
import { CrearChatComponent } from './paginas/crear-chat/crear-chat.component';
import { ChatComponent } from './paginas/chat/chat.component';
import { ChatTarjetaComponent } from './components/chat-tarjeta/chat-tarjeta.component';
import { CompraComponent } from './paginas/compra/compra.component';
import { SpamComponent } from './paginas/spam/spam.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LegalComponent } from './paginas/legal/legal.component';
import { ComercialComponent } from './paginas/comercial/comercial.component';
import { TerminosComponent } from './paginas/terminos/terminos.component';
import { AboutUsComponent } from './paginas/about-us/about-us.component';
import { EscaparateComponent } from './paginas/escaparate/escaparate.component';
import { MisPedidosComponent } from './paginas/mis-pedidos/mis-pedidos.component';
import { PedidoTarjetaComponent } from './components/pedido-tarjeta/pedido-tarjeta.component';
import { MiCuentaComponent } from './paginas/mi-cuenta/mi-cuenta.component';
import { CambiarContrasenaComponent } from './paginas/cambiar-contrasena/cambiar-contrasena.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GarantiaComponent } from './paginas/garantia/garantia.component';
import { DevolucionReclamacionComponent } from './paginas/devolucion-reclamacion/devolucion-reclamacion.component';
import { GOATComponent } from './paginas/goat/goat.component';
import { RegisterAsistenteTecnicoComponent } from './auth/register-asistente-tecnico/register-asistente-tecnico.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { SoporteComponent } from './paginas/soporte/soporte.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { MapaProveedorComponent } from './components/mapa-proveedor/mapa-proveedor.component';
import { MapaRegistroComponent } from './components/mapa-registro/mapa-registro.component';
import { ProveedoresComponent } from './paginas/proveedores/proveedores.component';
import { ProveedorTarjetaComponent } from './components/proveedor-tarjeta/proveedor-tarjeta.component';
import { CompradoresComponent } from './paginas/compradores/compradores.component';
import { CompradorTarjetaComponent } from './components/comprador-tarjeta/comprador-tarjeta.component';
import { AsistentesComponent } from './paginas/asistentes/asistentes.component';
import { AsistenteTarjetaComponent } from './components/asistente-tarjeta/asistente-tarjeta.component';
import { ProductosCategoriaComponent } from './paginas/productos-categoria/productos-categoria.component';
import { EstadoEnvioComponent } from './components/estado-envio/estado-envio.component';


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
    perfilComponent,
    MisProductosComponent,
    CrearProductoComponent,
    ActualizarProductoComponent,
    SerCompradorComponent,
    FaqsComponent,
    CrearFaqComponent,
    CarritoComponent,
    IncidenciasComponent,
    IncidenciaTarjetaComponent,
    IncidenciaComponent,
    CrearIncidenciaComponent,
    MisIncidenciasComponent, 
    BuscadorComponent, 
    MisChatsComponent, 
    CrearChatComponent, 
    ChatComponent, 
    ChatTarjetaComponent, 
    SpamComponent, 
    FooterComponent, 
    LegalComponent, 
    ComercialComponent, 
    TerminosComponent, 
    AboutUsComponent,
    CompraComponent,
    EscaparateComponent,
    MisPedidosComponent,
    PedidoTarjetaComponent,
    GarantiaComponent,
    DevolucionReclamacionComponent,
    MiCuentaComponent,
    CambiarContrasenaComponent,
    GOATComponent,
    RegisterAsistenteTecnicoComponent,
    DashboardComponent,
    SoporteComponent,
    MapaComponent,
    MapaProveedorComponent,
    MapaRegistroComponent,
    ProveedoresComponent,
    ProveedorTarjetaComponent,
    CompradoresComponent,
    CompradorTarjetaComponent,
    AsistentesComponent,
    AsistenteTarjetaComponent,
    ProductosCategoriaComponent,
    EstadoEnvioComponent


  ],
  exports: [ ProductoTarjetaComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSortModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    GoogleMapsModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCSLd2fV-Xu-7hd_m6Grf6-RswNY3bgctE",
    authDomain: "sellersplaza-41a82.firebaseapp.com",
    projectId: "sellersplaza-41a82",
    storageBucket: "sellersplaza-41a82.appspot.com",
    messagingSenderId: "20830206757",
    appId: "1:20830206757:web:bcd62b932b5668021938cc",
    measurementId: "G-GGCB453GBP"
    }),
    AngularFireStorageModule,


  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[MapaComponent]
})
export class AppModule { }