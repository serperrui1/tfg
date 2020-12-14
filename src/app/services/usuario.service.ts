import { Injectable, NgZone } from '@angular/core';
import { LoginForm } from '../interfaces/login-form.interface';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { RegisterCompradorComponent } from '../auth/register-comprador/register-comprador.component';
import { RegisterProveedorComponent } from '../auth/register-proveedor/register-proveedor.component';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2: any;

  constructor( private http: HttpClient,
    private ngZone: NgZone,
    private router: Router) {

      this.googleInit();
     }


  login( formData: LoginForm ) {
    
    return this.http.post(`${ base_url }/login/${formData.usuario}`, formData ).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token )
      })
    );

  }

  logout() {

    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });

  }

  crearComprador( formData: RegisterCompradorComponent) {
    
    return this.http.post(`${ base_url }/compradores`, formData )
          .pipe(
            tap( (resp: any) => {
              localStorage.setItem('token', resp.token )
            })
           )

  }
  crearProveedor( formData: RegisterProveedorComponent) {
    
    return this.http.post(`${ base_url }/proveedores`, formData )
          .pipe(
            tap( (resp: any) => {
              localStorage.setItem('token', resp.token )
            })
           )

  }

  googleInit() {

    return new Promise( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '376500471239-rl5ogugfurk2bvjdrphgs4i9iotpdo3q.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })

  }

  loginGoogle( token ) {
    
    return this.http.post(`${ base_url }/login/google`, { token } )
            .pipe(
              tap( (resp: any) => {
                localStorage.setItem('token', resp.token )
              })
            );

  }

}