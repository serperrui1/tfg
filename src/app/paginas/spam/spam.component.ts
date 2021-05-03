import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Administrador } from '../../models/administrador';
import { SpamService } from '../../services/spam.service';
import { UsuarioService } from '../../services/usuario.service';
import { Spam } from '../../models/spam';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-spam',
  templateUrl: './spam.component.html',
  styleUrls: ['./spam.component.css']
})
export class SpamComponent implements OnInit {

  public spamForm: FormGroup;
  public usuario:string;
  public administrador: Administrador;
  public token: string;
  formSubmited:boolean = false;
  public spam: Spam;
  public expresionesSpam: string[];
  public flag: boolean = false;

  datos: any = {}

  constructor(private fb:FormBuilder,
    private spamService: SpamService,
    private usuarioService: UsuarioService) {
      this.usuario =localStorage.getItem('usuario');
      this.token =localStorage.getItem('token');
     }

  async ngOnInit() {
    this.spam = (await this.spamService.getSpam())[0];
    this.datos.expresiones = this.spam.expresiones;
  }

  
  actualizarSpam(form:NgForm) {
    let expresiones = form.value["expresiones"];
    let nuevoArrayExpresiones = expresiones.split(",")
    this.spam.expresiones = nuevoArrayExpresiones
    this.spamService.actualizarSpam( this.spam)
    .subscribe( () => {
      Swal.fire('Guardado', 'SPAM actualizado', 'success');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

}
