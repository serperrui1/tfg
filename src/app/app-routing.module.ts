import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoutingModule } from './auth/auth.routing';
import { PaginaComponent } from './paginas/pagina.component';
import { PagesRoutingModule } from './paginas/paginas.routing';


const routes: Routes = [

  { path: '', component: PaginaComponent},
  { path: '**', pathMatch: 'full', redirectTo: ''},

];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes ),
    AuthRoutingModule,
    PagesRoutingModule
    
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }