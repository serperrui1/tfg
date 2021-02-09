import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CarritoService } from '../../services/carrito.service';
import { Incidencia } from '../../models/incidencia';
import { IncidenciaService } from '../../services/incidencia.service';
import { AsistenteTecnico } from '../../models/asistente';
import { Comprador } from '../../models/comprador';
import { Proveedor } from '../../models/proveedor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'
  ]
})
export class NavbarComponent implements OnInit{

  public cuant:number[] = [];
  public temp:number = 0;
  public res:number = 0;
  public res2:number = 0;
  public excl:number = 0;
  public misIncidencias: Incidencia[];
  public incidencia: Incidencia;
  public notiIndiv:number = 0;
  public existeTokenYProveedor= false;
  public usuario:string;
  public token: string;
  public aT: AsistenteTecnico;
  public comp: Comprador;
  public prov: Proveedor;
  public ultimoMensaje:string;
  
  constructor(private fb:FormBuilder,
    private usuarioService: UsuarioService,
    private router:Router,
    private carritoService: CarritoService,
    private incidenciaService: IncidenciaService) { 
      this.proveedor();
      this.usuario =localStorage.getItem('usuario');
      this.token =localStorage.getItem('token');
  }

  public buscadorForm = this.fb.group({
    producto:['']
  })
  
  async ngOnInit() {
    this.notifica();
    this.sumaNotiInci();
    this.noMiNotiGene();
  }

  notifica(){
    this.cuant = this.carritoService.getCantidades();
    if(this.cuant != null){
      for (let i = 0; i < this.cuant.length; i++) {
        this.temp = this.temp + this.cuant[i].valueOf();
      }
    }
    this.res = this.temp;
  }

  async sumaNotiInci(){
    this.misIncidencias = await (this.incidenciaService.getMisIncidencias());
    for (let i = 0; i < this.misIncidencias.length; i++) {
      this.incidencia = this.misIncidencias[i];
      this.notiIndiv = JSON.parse(localStorage.getItem(this.incidencia._id));//vemos si tiene notificaciones en localstorage
      if(this.notiIndiv != 0 && this.notiIndiv != null){ //si existe y es mayor de cero, sumamos
        this.excl = this.excl + this.notiIndiv;
      }
    }
    this.res2 = this.excl;
  }

  async noMiNotiGene(){
    this.aT = await this.usuarioService.getAsistenteTecnico();
    if(this.aT === null){
      this.comp = await this.usuarioService.getComprador();
      if(this.comp === null){
        this.prov = await this.usuarioService.getProveedor();
      }
    }
    if(this.comp){
      for (let i = 0; i < this.misIncidencias.length; i++) {
        this.incidencia = this.misIncidencias[i];
        this.ultimoMensaje = this.incidencia.mensajes[this.incidencia.mensajes.length-1];
        if(this.ultimoMensaje.indexOf(this.comp.nombre) === 0){
          this.res2 = this.res2 - 1;
        }
      }
    }
    if(this.prov){
      for (let i = 0; i < this.misIncidencias.length; i++) {
        this.incidencia = this.misIncidencias[i];
        this.ultimoMensaje = this.incidencia.mensajes[this.incidencia.mensajes.length-1];
        if(this.ultimoMensaje.indexOf(this.prov.nombreEmpresa) === 0){
          this.res2 = this.res2 - 1;
        }
      }
    }
    if(this.aT && (this.incidencia.asistenteId === this.aT.uid)){
      for (let i = 0; i < this.misIncidencias.length; i++) {
        this.incidencia = this.misIncidencias[i];
        this.ultimoMensaje = this.incidencia.mensajes[this.incidencia.mensajes.length-1];
        if(this.ultimoMensaje.indexOf(this.aT.nombre) === 0){
          this.res2 = this.res2 - 1;
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cuant']) {
        this.notifica();
    }
    if (changes['misIncidencias']) {
      this.sumaNotiInci();
    }
  }

  logout(){
    this.usuarioService.logout();
  }

  proveedor(){
    if(localStorage.getItem('usuario')==="proveedor" && localStorage.getItem('token')){
      this.existeTokenYProveedor=true;
    }
  }

  buscarProducto( ){
    this.router.navigate( ['/buscador',this.buscadorForm.value['producto']] );
  }
}
