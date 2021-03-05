import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CompradorGuard implements CanActivate {
  constructor( private usuarioService:UsuarioService,
               private router:Router ){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.usuarioService.token  &&  localStorage.getItem('usuario')==="comprador"){
      return true;
    }else{
      this.router.navigateByUrl('/')
    }
  }
  
}
