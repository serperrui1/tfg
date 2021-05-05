import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { IncidenciaService } from '../../services/incidencia.service';
import { Incidencia } from '../../models/incidencia';
import { ActivatedRoute } from '@angular/router';
import { AsistenteTecnico } from '../../models/asistente';
import Swal from 'sweetalert2';
import { SpamValidator } from '../../Validaciones-Customizadas.directive';
import { Spam } from '../../models/spam';
import { SpamService } from '../../services/spam.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Comprador } from '../../models/comprador';
import { Proveedor } from '../../models/proveedor';

const base_url = environment.base_url;

@Component({
  selector: 'app-incidencia',
  templateUrl: './incidencia.component.html',
  styleUrls: ['./incidencia.component.css']
})
export class IncidenciaComponent implements OnInit {

  public incidenciaForm: FormGroup;
  public incidencia: Incidencia;
  public aT: AsistenteTecnico;
  public comp: Comprador;
  public prov: Proveedor;
  public token: string;
  public usuario:string;
  public incidenciaId: string;
  public puedesBorrar: boolean = false;
  public puedesActualizar: boolean = false;
  public compradorNombre: string = "";
  public proveedorNombre: string = "";
  public asistenteTecnicoNombre: string = "";
  public autor: string = "";
  public message: string = "";
  public lastMessage: string = "";
  public checkeaste: boolean = false;
  public cont: number;
  public spam: Spam;
  public expresionesSpam: string[];


  constructor(private fb:FormBuilder,
    private incidenciaService: IncidenciaService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private spamService: SpamService,
    private router:Router) { 
      this.usuario =localStorage.getItem('usuario');
      this.token =localStorage.getItem('token');
  }

  async ngOnInit() {

    if((this.usuario != "administrador") && this.token != null) {

      this.activatedRoute.params.subscribe( params => {
        this.incidenciaId = params['id']; 
      });

      this.incidencia = await this.incidenciaService.getIncidenciaPorID(this.incidenciaId);

      this.spam = (await this.spamService.getSpam())[0];
      this.expresionesSpam = this.spam.expresiones;
    
      this.incidenciaForm = this.fb.group({
        titulo: [ this.incidencia.titulo],
        fechaPublicacion: [ this.incidencia.fechaPublicacion],
        descripcion: [ this.incidencia.descripcion],
        tematica: [ this.incidencia.tematica],
        mensajes: ['', [Validators.required, SpamValidator(this.expresionesSpam)] ],
        asignado: [ this.incidencia.asignado],
        resuelto: [ this.incidencia.resuelto],
      });

      this.aT = await this.usuarioService.getAsistenteTecnico();
      if(this.aT != null){
          if(await this.usuarioService.getCompradorNombre(this.incidencia.creadorId) != ""){
            this.compradorNombre = await this.usuarioService.getCompradorNombre(this.incidencia.creadorId);
          } else if (await this.usuarioService.getProveedorNombre(this.incidencia.creadorId) != ""){
            this.proveedorNombre = await this.usuarioService.getProveedorNombre(this.incidencia.creadorId);
          }
        this.autor = this.aT.nombre + ": ";
      }

      if(this.aT === null){
        this.comp = await this.usuarioService.getComprador();
        if(this.comp != null){
          this.autor = this.comp.nombre + ": ";
        }
        if(this.comp === null){
          this.prov = await this.usuarioService.getProveedor();
          if(this.prov != null){
            this.autor = this.prov.nombreEmpresa + ": ";
          }
        }
      }

      if(this.incidencia.asistenteId != ""){
        this.asistenteTecnicoNombre = await this.usuarioService.getAsistenteTecnicoNombre(this.incidencia.asistenteId);
      }

      if(this.incidencia.asistenteId === ""){
        this.asistenteTecnicoNombre = "Ningún asistente por ahora";
      }

      

      if((this.aT != null && this.incidencia.asistenteId === "") || (this.aT != null && this.aT.uid === this.incidencia.asistenteId) || (this.comp != null && this.comp.uid === this.incidencia.creadorId) || (this.prov != null && this.prov.uid === this.incidencia.creadorId)){
        this.puedesActualizar = true;
      }

      if(this.aT != null && this.aT.uid === this.incidencia.asistenteId && this.incidencia.asistenteId != "" && this.incidencia.resuelto === true && this.incidencia.asignado === true){
        this.puedesBorrar = true;
      }

      this.incidencia = await this.incidenciaService.incidenciaLeida(this.incidenciaId);

    }else{
      console.log("Acceso denegado para actualizar esta incidencia");
    };
    console.log(this.incidencia.asignado)
  }

  actualizarIncidencia() {
    if(this.puedesActualizar === true){
      if(this.incidenciaForm.invalid){
        this.incidenciaForm.markAllAsTouched()
        return;
      }
      this.message = this.incidenciaForm.controls['mensajes'].value;
      this.incidenciaForm.controls['mensajes'].setValue(this.autor + this.message);
      //--------------------------------------------------------------------------------
      if(this.incidencia.asistenteId != "" || (this.incidencia.asistenteId === "" && this.aT)){
        this.cont = JSON.parse(localStorage.getItem(this.incidencia._id));
        this.cont = this.cont + 1;
        localStorage.setItem(this.incidencia._id, JSON.stringify(this.cont));
      }
      //--------------------------------------------------------------------------------
      this.incidenciaService.actualizarIncidencia( this.incidenciaForm.value, this.incidencia._id )
      .subscribe( () => {
        Swal.fire('Guardado', 'Incidencia actualizada.', 'success');
        location.reload();
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
    }
  }


  borrarIncidencia( incidencia: Incidencia ) {
    if(this.puedesBorrar === true){
      this.incidenciaService.borrarIncidencia( incidencia._id )
          .subscribe( resp => {
            Swal.fire( 'Borrado', 'Incidencia borrada con éxito', 'success' );
          }, (err) => {
            Swal.fire('Error', 'Ha habido un problema', 'error');
          });
    }
  }

  check() {
    const ele = document.getElementById("resuelto") as HTMLInputElement;
    if(ele.checked){
      this.checkeaste = true;
    }
  }

  //Validaciones
  get mensajeNoValido(){
    return this.mensajeCampoRequerido
  }
  get mensajeCampoRequerido(){
    return this.incidenciaForm.get('mensajes').errors ? this.incidenciaForm.get('mensajes').errors.required && this.incidenciaForm.get('mensajes').touched : null
  }
  get mensajes(){
    return this.incidenciaForm.get('mensajes');
  }


}
