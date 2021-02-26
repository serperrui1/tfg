import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { PaginaComponent } from './pagina.component';
import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './producto/producto.component';
import { CompradorPerfilComponent } from './perfil/perfil.component';
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
import { MiCuentaComponent} from './mi-cuenta/mi-cuenta.component'
import { CambiarContrasenaComponent} from './cambiar-contrasena/cambiar-contrasena.component'

//Guards
import { AuthGuard } from '../guards/auth.guard';
import { CompradorGuard } from '../guards/comprador.guard';

const routes: Routes = [
    { 
        path: '', 
        component: PaginaComponent,
        children: [
            { path: '', component: HomeComponent},
            { path: 'home', component: HomeComponent},
            { path: 'producto/:id', component: ProductoComponent},
            { path: 'mi-perfil', canActivate: [AuthGuard] , component: CompradorPerfilComponent},
            { path: 'ser-comprador', component: SerCompradorComponent},
            { path: 'mis-productos', component: MisProductosComponent},
            { path: 'crear-producto', component: CrearProductoComponent},
            { path: 'crear-incidencia', component: CrearIncidenciaComponent},
            { path: 'crear-chat', component: CrearChatComponent},
            { path: 'actualizar-producto/:id', component: ActualizarProductoComponent},
            { path: 'crear-faq', component: CrearFaqComponent},
            { path: 'faqs', component: FaqsComponent},
            { path: 'spam', component: SpamComponent},
            { path: 'buscador/:producto', component: BuscadorComponent},
            { path: 'mi-carrito', component: CarritoComponent},
            { path: 'incidencia/:id', canActivate: [AuthGuard] ,component: IncidenciaComponent},
            { path: 'chat/:id', canActivate: [AuthGuard] ,component: ChatComponent},
            { path: 'incidencias', canActivate: [AuthGuard] ,component: IncidenciasComponent},
            { path: 'mis-incidencias',canActivate: [AuthGuard] , component: MisIncidenciasComponent},
            { path: 'mis-chats', component: MisChatsComponent},
            { path: 'sobre-nosotros', component: AboutUsComponent},
            { path: 'terminos-registro', component: TerminosComponent},
            { path: 'legal', component: LegalComponent},
            { path: 'comercial', component: ComercialComponent},
            { path: 'compra', canActivate: [CompradorGuard], component: CompraComponent},
            { path: 'escaparate/:id', component: EscaparateComponent},
            { path: 'mis-pedidos',canActivate: [CompradorGuard], component: MisPedidosComponent},
            { path: 'mi-cuenta', canActivate: [AuthGuard] , component: MiCuentaComponent},
            { path: 'perfil/cambiar-contrasena', component: CambiarContrasenaComponent},
            { path: '**', pathMatch: 'full', redirectTo: ''},
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}
