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
import { CarritoComponent } from './carrito/carrito.component';
import { IncidenciasComponent } from './incidencias/incidencias.component';
import { IncidenciaComponent } from './incidencia/incidencia.component';
import { MisIncidenciasComponent } from './mis-incidencias/mis-incidencias.component';
import { CrearIncidenciaComponent } from './crear-incidencia/crear-incidencia.component';

const routes: Routes = [
    { 
        path: '', 
        component: PaginaComponent,
        children: [
            { path: '', component: HomeComponent},
            { path: 'home', component: HomeComponent},
            { path: 'producto/:id', component: ProductoComponent},
            { path: 'mi-perfil', component: CompradorPerfilComponent},
            { path: 'ser-comprador', component: SerCompradorComponent},
            { path: 'mis-productos', component: MisProductosComponent},
            { path: 'crear-producto', component: CrearProductoComponent},
            { path: 'crear-incidencia', component: CrearIncidenciaComponent},
            { path: 'actualizar-producto/:id', component: ActualizarProductoComponent},
            { path: 'crear-faq', component: CrearFaqComponent},
            { path: 'faqs', component: FaqsComponent},
            { path: 'mi-carrito', component: CarritoComponent},
            { path: 'incidencia/:id', component: IncidenciaComponent},
            { path: 'incidencias', component: IncidenciasComponent},
            { path: 'mis-incidencias', component: MisIncidenciasComponent},
            { path: '**', pathMatch: 'full', redirectTo: ''},
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}
