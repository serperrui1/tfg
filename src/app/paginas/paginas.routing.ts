import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { PaginaComponent } from './pagina.component';
import { HomeComponent } from '../components/home/home.component';
import { ProductoComponent } from '../components/producto/producto.component';
const routes: Routes = [
    { 
        path: '', 
        component: PaginaComponent,
        children: [
            { path: '', component: HomeComponent},
            { path: 'home', component: HomeComponent},
            { path: 'producto', component: ProductoComponent},
            { path: '**', pathMatch: 'full', redirectTo: ''},
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}
