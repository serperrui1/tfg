import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { PaginaComponent } from './pagina.component';
import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './producto/producto.component';
import { perfilComponent } from './perfil/perfil.component';
import { MisProductosComponent } from './mis-productos/mis-productos.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { ActualizarProductoComponent } from './actualizar-producto/actualizar-producto.component';
import { SerCompradorComponent } from './ser-comprador/ser-comprador.component';
import { FaqsComponent } from './faqs/faqs.component';
import { CrearFaqComponent } from './crear-faq/crear-faq.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { CarritoComponent } from './carrito/carrito.component';
import { IncidenciasComponent } from './incidencias/incidencias.component';
import { IncidenciaComponent } from './incidencia/incidencia.component';
import { MisIncidenciasComponent } from './mis-incidencias/mis-incidencias.component';
import { MisChatsComponent } from './mis-chats/mis-chats.component';
import { CrearIncidenciaComponent } from './crear-incidencia/crear-incidencia.component';
import { CrearChatComponent } from './crear-chat/crear-chat.component';
import { ChatComponent } from './chat/chat.component';
import { CompraComponent } from './compra/compra.component';
import { SpamComponent } from './spam/spam.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TerminosComponent } from './terminos/terminos.component';
import { LegalComponent } from './legal/legal.component';
import { ComercialComponent } from './comercial/comercial.component';
import { EscaparateComponent } from './escaparate/escaparate.component';
import { MisPedidosComponent } from './mis-pedidos/mis-pedidos.component';
import { GarantiaComponent } from './garantia/garantia.component';
import { DevolucionReclamacionComponent } from './devolucion-reclamacion/devolucion-reclamacion.component';
import { MiCuentaComponent} from './mi-cuenta/mi-cuenta.component'
import { CambiarContrasenaComponent} from './cambiar-contrasena/cambiar-contrasena.component'
import { GOATComponent } from './goat/goat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SoporteComponent } from './soporte/soporte.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { CompradoresComponent } from './compradores/compradores.component';
//Guards
import { AuthGuard } from '../guards/auth.guard';
import { CompradorGuard } from '../guards/comprador.guard';
import { CompradorProveedorGuard } from '../guards/comprador-proveedor.guard';
import { ProveedorGuard } from '../guards/proveedor.guard';
import { AdministradorGuard } from '../guards/administrador.guard';
import { AsistenteGuard } from '../guards/asistente.guard';
import { AsistentesComponent } from './asistentes/asistentes.component';




const routes: Routes = [
    { 
        path: '', 
        component: PaginaComponent,
        children: [
            { path: '', component: HomeComponent},
            { path: 'home', component: HomeComponent},
            { path: 'producto/:id', component: ProductoComponent},
            { path: 'mi-perfil', canActivate: [AuthGuard] , component: perfilComponent},
            { path: 'ser-comprador', canActivate: [ProveedorGuard] , component: SerCompradorComponent},
            { path: 'mis-productos', canActivate: [ProveedorGuard], component: MisProductosComponent},
            { path: 'crear-producto', canActivate: [ProveedorGuard] , component: CrearProductoComponent},
            { path: 'crear-incidencia', canActivate: [CompradorProveedorGuard], component: CrearIncidenciaComponent},
            { path: 'crear-chat/:id', canActivate: [CompradorGuard], component: CrearChatComponent},
            { path: 'devolver-reclamar/:id', canActivate: [CompradorGuard], component: DevolucionReclamacionComponent},
            { path: 'actualizar-producto/:id', canActivate: [ProveedorGuard], component: ActualizarProductoComponent},
            { path: 'crear-faq', canActivate: [AsistenteGuard], component: CrearFaqComponent},
            { path: 'GOAT', component: GOATComponent},
            { path: 'faqs', component: FaqsComponent},
            { path: 'soporte', component: SoporteComponent},
            { path: 'garantia', component: GarantiaComponent},
            { path: 'proveedores', component: ProveedoresComponent},
            { path: 'compradores', component: CompradoresComponent},
            { path: 'asistentes', component: AsistentesComponent},
            { path: 'spam', canActivate: [AdministradorGuard], component: SpamComponent},
            { path: 'buscador/:producto', component: BuscadorComponent},
            { path: 'mi-carrito', component: CarritoComponent},
            { path: 'incidencia/:id', canActivate: [AuthGuard] ,component: IncidenciaComponent},
            { path: 'chat/:id',canActivate: [CompradorProveedorGuard],component: ChatComponent},
            { path: 'incidencias', canActivate: [AsistenteGuard] ,component: IncidenciasComponent},
            { path: 'mis-incidencias',canActivate: [AuthGuard] , component: MisIncidenciasComponent},
            { path: 'mis-chats',canActivate: [CompradorProveedorGuard], component: MisChatsComponent},
            { path: 'sobre-nosotros', component: AboutUsComponent},
            { path: 'politica-privacidad', component: TerminosComponent},
            { path: 'terminos-uso-y-aviso-legal', component: LegalComponent},
            { path: 'dashboard', canActivate: [AdministradorGuard] , component: DashboardComponent},
            { path: 'comercial', component: ComercialComponent},
            { path: 'compra', canActivate: [CompradorGuard], component: CompraComponent},
            { path: 'escaparate/:id', component: EscaparateComponent},
            { path: 'mis-pedidos',canActivate: [CompradorGuard], component: MisPedidosComponent},
            { path: 'mis-ventas',canActivate: [ProveedorGuard], component: DashboardComponent},
            { path: 'mi-cuenta', canActivate: [AuthGuard] , component: MiCuentaComponent},
            { path: 'perfil/cambiar-contrasena', canActivate: [AuthGuard], component: CambiarContrasenaComponent},
            { path: '**', pathMatch: 'full', redirectTo: ''},
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}
