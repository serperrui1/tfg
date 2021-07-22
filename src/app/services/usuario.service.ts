import { Injectable, NgZone } from '@angular/core';
import { LoginForm } from '../interfaces/login-form.interface';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { RegisterCompradorComponent } from '../auth/register-comprador/register-comprador.component';
import { RegisterProveedorComponent } from '../auth/register-proveedor/register-proveedor.component';
import { Comprador } from '../models/comprador';
import { Proveedor } from '../models/proveedor';
import { Administrador } from '../models/administrador';
import { AsistenteTecnico } from '../models/asistente';
import { RegisterAsistenteTecnicoComponent } from '../auth/register-asistente-tecnico/register-asistente-tecnico.component';
import Swal from 'sweetalert2';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2: any;
  public comprador: Comprador;

  constructor( private http: HttpClient,
    private ngZone: NgZone,
    private router: Router) {

      this.googleInit();
     }

     get token(): string {
      return localStorage.getItem('token') || '';
    }
  
    get usuario(): string {
      return localStorage.getItem('usuario');
    }
  
    get headers() {
      return {
        headers: {
          'x-token': this.token,
          'usuario': this.usuario
        }
      }
    }
  
    
  login( formData: LoginForm ) {
    
    return this.http.post(`${ base_url }/login/${formData.usuario}`, formData ).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    );

  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
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
              
            })
           )

  }

  convertirseEnComprador( formData: RegisterCompradorComponent):Promise<Comprador>{
    return new Promise<Comprador> (resolve=> {
      this.http.post(`${ base_url }/compradores`, formData, this.headers )
      .subscribe(data =>{
        if(data["ok"] == true){
          const comprador:Comprador= data["comprador"];
          resolve(comprador);
          Swal.fire('Guardado', 'Se ha convertido en un comprador.', 'success');
          this.router.navigateByUrl('/login');
        }else{
          Swal.fire('Error', data["msg"] , 'error');
        }
      });
    } )
  }

  crearAsistenteTecnico( formData: RegisterAsistenteTecnicoComponent) {
    return this.http.post(`${ base_url }/administradores`, formData ,{
      headers: { 
        'x-token': this.token
      }
    })
          .pipe(
            tap( (resp: any) => {
              localStorage.setItem('token', resp.token );
              localStorage.setItem('usuario', "asistenteTecnico" );
            })
           )
  }


  borrarAsistenteTecnico(_id: string) {
    const url = `${ base_url }/administradores/eliminar/asistente/${ _id }`;
    return this.http.delete( url, this.headers );
  }

  borrarProveedor(_id: string) {
    const url = `${ base_url }/administradores/eliminar/proveedor/${ _id }`;
    return this.http.delete( url, this.headers );
  }

  borrarComprador(_id: string) {
    const url = `${ base_url }/administradores/eliminar/comprador/${ _id }`;
    return this.http.delete( url, this.headers );
  }

  borrarMiCuentaComprador(uid: string) {
    const url = `${ base_url }/compradores/${ uid }`;
    return this.http.delete( url, this.headers );
  }

  borrarMiCuentaProveedor(uid: string) {
    const url = `${ base_url }/proveedores/${ uid }`;
    return this.http.delete( url, this.headers );
  }

  getBuscadorProveedores(data:any):Promise<Proveedor[]>{
    return new Promise<Proveedor[]>(
      resolve => {
        this.http.post(`${base_url}/proveedores/buscador`,data,{
         }).subscribe(data=>{
          const proveedores = data["proveedores"];
          resolve(proveedores);
        });
      })
  }

  getBuscadorCompradores(data:any):Promise<Comprador[]>{
    return new Promise<Comprador[]>(
      resolve => {
        this.http.post(`${base_url}/compradores/buscador`,data,{
          headers: { 
            'x-token': this.token
          }
         }).subscribe(data=>{
          const compradores = data["compradores"];
          resolve(compradores);
        });
      })
  }

  getBuscadorAsistentes(data:any):Promise<AsistenteTecnico[]>{
    return new Promise<AsistenteTecnico[]>(
      resolve => {
        this.http.post(`${base_url}/asistentesTecnicos/buscador`,data,{
          headers: { 
            'x-token': this.token
          }
         }).subscribe(data=>{
          const asistentes = data["asistentes"];
          resolve(asistentes);
        });
      })
  }

  crearProveedor( formData: RegisterProveedorComponent) {
    
    return this.http.post(`${ base_url }/proveedores`, formData )
          .pipe(
            tap( (resp: any) => {
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
                localStorage.setItem('usuario', "comprador" );
              })
            );

  }


  actualizarCompradorPerfil( data: Comprador , uid:string) {

    return this.http.put(`${ base_url }/compradores/${ uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });

  }

  actualizarContrasena( data: any) {
    let usuario = localStorage.getItem("usuario")
    let usuarioUrl:string;
    switch ( usuario ){
      case "comprador":
        usuarioUrl = "compradores";
        break;
      case "proveedor":
        usuarioUrl = "proveedores";
        break;
      case "administrador":
        usuarioUrl = "administradores";
        break;
      case "asistenteTecnico":
        usuarioUrl = "asistentesTecnicos";
        break;
    }

    return this.http.put(`${ base_url }/${ usuarioUrl }/actualizar/contrasena`, data, {
      headers: {
        'x-token': this.token
      }
    });

  }

  getComprador():Promise<Comprador>{

    return new Promise<Comprador> (resolve=> {

      this.http.get(`${ base_url }/compradores/perfil`,{
        headers: {
          'x-token': this.token
        }
      }).subscribe(data =>{
        const comprador:Comprador = data["compradores"];
        resolve(comprador);
      });
    } )
    
    

  }

  getAsistenteTecnico():Promise<AsistenteTecnico>{

    return new Promise<AsistenteTecnico> (resolve=> {

      this.http.get(`${ base_url }/asistentesTecnicos/perfil`,{
        headers: {
          'x-token': this.token
        }
      }).subscribe(data =>{
        const asistenteTecnico:AsistenteTecnico = data["asistentesTecnicos"];
        resolve(asistenteTecnico);
      });
    } )
    
    

  }

  getAdministrador():Promise<Administrador>{

    return new Promise<Administrador> (resolve=> {

      this.http.get(`${ base_url }/administradores/perfil`,{
        headers: {
          'x-token': this.token
        }
      }).subscribe(data =>{
        const administrador:Administrador = data["administrador"];
        resolve(administrador);
        console.log(administrador)
      });
    } )
  }


  actualizarProveedorPerfil( data: Proveedor , uid:string) {

    return this.http.put(`${ base_url }/proveedores/${ uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });

  }

  getProveedor():Promise<Proveedor>{

    return new Promise<Proveedor> (resolve=> {

      this.http.get(`${ base_url }/proveedores/perfil`,{
        headers: {
          'x-token': this.token
        }
      }).subscribe(data =>{
        const proveedor:Proveedor = data["proveedor"];
        resolve(proveedor);
      });
    } )
  }

  getProveedorPorID(id:string):Promise<Proveedor>{
    return new Promise<Proveedor>(
      resolve=> {
        this.http.get(`${base_url}/proveedores/escaparate/${id}`).subscribe(data=>{
          const proveedor = data["proveedor"];
          resolve(proveedor);
        });
     })
 }

 getCompradores():Promise<Comprador[]>{
  return new Promise<Comprador[]>(
    resolve => {
      this.http.get(`${base_url}/compradores/`,{
        headers: {
          'x-token': this.token
        }
      }).subscribe(data=>{
        const compradores = data["compradores"];
        resolve(compradores);
      });
    })
  }

  getAsistentes():Promise<AsistenteTecnico[]>{
    return new Promise<AsistenteTecnico[]>(
      resolve => {
        this.http.get(`${base_url}/asistentesTecnicos/`,{
        }).subscribe(data=>{
          const asistentes = data["asistentesTecnicos"];
          resolve(asistentes);
        });
      })
    }

  getProveedores():Promise<Proveedor[]>{
    return new Promise<Proveedor[]>(
      resolve => {
        this.http.get(`${base_url}/proveedores/`,{
        }).subscribe(data=>{
          const proveedores = data["proveedores"];
          resolve(proveedores);
        });
      })
    }
    
  
  getProveedorNombre(id:string):Promise<string>{

    return new Promise<string> (resolve=> {

      this.http.get(`${ base_url }/proveedores/nombre/${ id }`)
      .subscribe(data =>{
        const proveedor:string= data["nombreEmpresa"];
        resolve(proveedor);
      });
    } )
  }

  getCompradorNombre(id:string):Promise<string>{

    return new Promise<string> (resolve=> {

      this.http.get(`${ base_url }/compradores/nombre/${ id }`)
      .subscribe(data =>{
        const comprador:string= data["nombre"];
        resolve(comprador);
      });
    } )
  }

  getAsistenteTecnicoNombre(id:string):Promise<string>{

    return new Promise<string> (resolve=> {

      this.http.get(`${ base_url }/asistentesTecnicos/nombre/${ id }`)
      .subscribe(data =>{
        const asistenteTecnico:string= data["nombre"];
        resolve(asistenteTecnico);
      });
    } )
  }

  getCompradorEmail(email:string):Promise<string>{

    return new Promise<string> (resolve=> {

      this.http.get(`${ base_url }/compradores/email/${ email }`)
      .subscribe(data =>{
        const comprador:string= data["email"];
        resolve(comprador);
      });
    } )
  }


  actualizarAsistenteTecnicoPerfil( data: AsistenteTecnico , uid:string) {

    return this.http.put(`${ base_url }/asistentesTecnicos/${ uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }


  actualizarAdministradorPerfil( data: Administrador , uid:string) {

    return this.http.put(`${ base_url }/administradores/${ uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

}
