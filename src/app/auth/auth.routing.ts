import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LoginCompradorComponent } from './login-comprador/login-comprador.component';
import { LoginEmpleadoComponent } from './login-empleado/login-empleado.component';
import { RegisterCompradorComponent } from './register-comprador/register-comprador.component';
import { RegisterProveedorComponent } from './register-proveedor/register-proveedor.component';

const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'login-comprador', component: LoginCompradorComponent },
    { path: 'login/empleado', component: LoginEmpleadoComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'register/comprador', component: RegisterCompradorComponent },
    { path: 'register/proveedor', component: RegisterProveedorComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
