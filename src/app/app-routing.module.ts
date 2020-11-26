import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [

  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', pathMatch: 'full', redirectTo: ''},

];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes ),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }