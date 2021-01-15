import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { PaginaComponent } from './pagina.component';
import { HomeComponent } from '../components/home/home.component';
import { ProductoComponent } from './producto/producto.component';
import { CompradorPerfilComponent } from './perfil/perfil.component';
import { MisProductosComponent } from './mis-productos/mis-productos.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { ActualizarProductoComponent } from './actualizar-producto/actualizar-producto.component';
import { SerCompradorComponent } from './ser-comprador/ser-comprador.component';
import { FaqsComponent } from './faqs/faqs.component';
import { CrearFaqComponent } from './crear-faq/crear-faq.component';
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
            { path: 'actualizar-producto/:id', component: ActualizarProductoComponent},
            { path: 'crear-faq', component: CrearFaqComponent},
            { path: 'faqs', component: FaqsComponent},
            { path: '**', pathMatch: 'full', redirectTo: ''},
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}
