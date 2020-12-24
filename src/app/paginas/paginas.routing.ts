import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { PaginaComponent } from './pagina.component';
import { HomeComponent } from '../components/home/home.component';
import { ProductoComponent } from './producto/producto.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MisproductosComponent } from './misproductos/misproductos.component';

const routes: Routes = [
    { 
        path: '', 
        component: PaginaComponent,
        children: [
            { path: '', component: HomeComponent},
            { path: 'home', component: HomeComponent},
            { path: 'producto/:id', component: ProductoComponent},
            { path: 'mi-perfil', component: PerfilComponent},
            { path: 'misproductos', component: MisproductosComponent},
            { path: '**', pathMatch: 'full', redirectTo: ''},
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}
