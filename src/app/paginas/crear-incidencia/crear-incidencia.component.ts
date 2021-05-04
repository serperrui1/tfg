import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FaqService } from '../../services/faq.service';
import { UsuarioService } from '../../services/usuario.service';
import { IncidenciaService } from '../../services/incidencia.service';
import Swal from 'sweetalert2';
import { SpamValidator } from '../../Validaciones-Customizadas.directive';
import { Spam } from '../../models/spam';
import { SpamService } from '../../services/spam.service';
import { Router } from '@angular/router';
import { Comprador } from '../../models/comprador';
import { Proveedor } from '../../models/proveedor';

@Component({
  selector: 'app-crear-incidencia',
  templateUrl: './crear-incidencia.component.html',
  styleUrls: ['./crear-incidencia.component.css']
})
export class CrearIncidenciaComponent implements OnInit {

  public token: string;
  public usuario:string;
  formSubmited:boolean = false;
  public incidenciaForm: FormGroup;
  public compradorNombre: string = "";
  public proveedorNombre: string = "";
  public comp: Comprador;
  public prov: Proveedor;
  public spam: Spam;
  public expresionesSpam: string[];

  constructor(private fb:FormBuilder,
    private incidenciaService: IncidenciaService,
    private usuarioService: UsuarioService,
    private spamService: SpamService,
    private router:Router) {
      this.usuario =localStorage.getItem('usuario');
      this.token =localStorage.getItem('token');
     }

     async ngOnInit() {
       
      if((this.usuario === "comprador" && this.token != null) || (this.usuario === "proveedor" && this.token != null)){
        this.spam = (await this.spamService.getSpam())[0];
        this.expresionesSpam = this.spam.expresiones;
        this.incidenciaForm = this.fb.group({
          titulo:['', [Validators.required, SpamValidator(this.expresionesSpam)]],
          descripcion:['', [Validators.required, SpamValidator(this.expresionesSpam)]],
          tematica:['Login', [ Validators.required] ]
        });

        
        this.comp = await this.usuarioService.getComprador();
        if(this.comp === null){
          this.prov = await this.usuarioService.getProveedor();
          this.proveedorNombre = this.prov.nombreEmpresa;
        }
        else if (this.comp != null){
          this.compradorNombre = this.comp.nombre;
        }
        
      }else{
        console.log("Para publicar una incidencia debes ser un comprador o un proveedor");
      };

    }

  async crearIncidencia(){
    if(this.incidenciaForm.invalid){
      this.incidenciaForm.markAllAsTouched()
      return;
    }
    this.formSubmited = true;
    await this.incidenciaService.crearIncidencia(this.incidenciaForm.value)
    .subscribe( () => {
      Swal.fire('Guardado', 'Incidencia creada', 'success');
      this.router.navigateByUrl('/mis-incidencias');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  get titulo()
  {
    return this.incidenciaForm.get('titulo');
  }

  get descripcion()
  {
    return this.incidenciaForm.get('descripcion');
  }

  campoNoValido (campo:string) :boolean{
    if(this.incidenciaForm.get(campo).invalid && this.formSubmited){
      return true;
    }else{
      return false;
    }
  }

  //Validaciones
  get tituloNoValido(){
    return this.tituloCampoRequerido
  }
  get tituloCampoRequerido(){
    return this.incidenciaForm.get('titulo').errors ? this.incidenciaForm.get('titulo').errors.required && this.incidenciaForm.get('titulo').touched : null
  }
  get descripcionNoValido(){
    return this.descripcionCampoRequerido
  }
  get descripcionCampoRequerido(){
    return this.incidenciaForm.get('descripcion').errors ? this.incidenciaForm.get('descripcion').errors.required && this.incidenciaForm.get('descripcion').touched : null
  }



}
