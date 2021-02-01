import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { IncidenciaService } from '../../services/incidencia.service';
import { Incidencia } from '../../models/incidencia';
import { ActivatedRoute } from '@angular/router';
import { AsistenteTecnico } from '../../models/asistente';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { Comprador } from '../../models/comprador';
import { Proveedor } from '../../models/proveedor';

const base_url = environment.base_url;

@Component({
  selector: 'app-incidencia',
  templateUrl: './incidencia.component.html',
  styles: [
  ]
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


  constructor(private fb:FormBuilder,
    private incidenciaService: IncidenciaService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService) { 

      this.usuario =localStorage.getItem('usuario');
      this.token =localStorage.getItem('token');

  }

  async ngOnInit() {
    if((this.usuario != "administrador") && this.token != null) {

      this.activatedRoute.params.subscribe( params => {
        this.incidenciaId = params['id']; 
      });

      this.incidencia = await this.incidenciaService.getIncidenciaPorID(this.incidenciaId);
    
      this.incidenciaForm = this.fb.group({
        titulo: [ this.incidencia.titulo],
        fechaPublicacion: [ this.incidencia.fechaPublicacion],
        descripcion: [ this.incidencia.descripcion],
        tematica: [ this.incidencia.tematica],
        mensajes: [ this.incidencia.mensajes],
        asignado: [ this.incidencia.asignado],
        resuelto: [ this.incidencia.resuelto],
    });

      this.aT = await this.usuarioService.getAsistenteTecnico();

      if(this.aT === null){
        this.comp = await this.usuarioService.getComprador();
        if(this.comp === null){
          this.prov = await this.usuarioService.getProveedor();
        }
      }

      if(this.incidencia.asistenteId != ""){
        this.asistenteTecnicoNombre = await this.usuarioService.getAsistenteTecnicoNombre(this.incidencia.asistenteId);
      }

      if(this.incidencia.asistenteId === ""){
        this.asistenteTecnicoNombre = "Ningún asistente por ahora";
      }

      this.compradorNombre = await this.usuarioService.getCompradorNombre(this.incidencia.creadorId);
      if(this.compradorNombre === ""){
        this.proveedorNombre = await this.usuarioService.getProveedorNombre(this.incidencia.creadorId);
      }

      if((this.aT != null && this.incidencia.asistenteId === "") || (this.aT != null && this.aT.uid === this.incidencia.asistenteId) || (this.comp != null && this.comp.uid === this.incidencia.creadorId) || (this.prov != null && this.prov.uid === this.incidencia.creadorId)){
        this.puedesActualizar = true;
      }

      if(this.aT != null && this.aT.uid === this.incidencia.asistenteId && this.incidencia.asistenteId != "" && this.incidencia.resuelto === true && this.incidencia.asignado === true){
        this.puedesBorrar = true;
      }
      
        

     
    }else{
      console.log("Acceso denegado para actualizar esta incidencia");
    };
  }

  actualizarIncidencia() {
    if(this.puedesActualizar === true){
      this.incidenciaService.actualizarIncidencia( this.incidenciaForm.value, this.incidencia._id )
      .subscribe( () => {
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      }, (err) => {
        console.log(err)
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
            console.log(err)
            Swal.fire('Error', 'Ha habido un problema', 'error');
          });
    }
  }



}
