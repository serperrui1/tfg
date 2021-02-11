import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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

  constructor(private fb:FormBuilder,
    private spamService: SpamService,
    private usuarioService: UsuarioService) {
      this.usuario =localStorage.getItem('usuario');
      this.token =localStorage.getItem('token');
     }

  async ngOnInit() {
    this.spam = (await this.spamService.getSpam())[0];
    if(this.usuario === "administrador" && this.token != null){
      this.spamForm = this.fb.group({
        /* expresiones: new FormControl([this.spam.expresiones,this.spamService.spamValidator]) */
        /* expresiones: new FormControl(null, [Validators.required]) */
        expresiones: [this.spam.expresiones, this.spamService.spamValidator]
        /* expresiones: new FormControl(null, [Validators.required, Validators.maxLength(8)]), */
      });
    }else{
      console.log("El usuario no es administrador");
    };
  }

  actualizarSpam() {
    this.spamService.actualizarSpam( this.spamForm.value,)
    .subscribe( () => {
      Swal.fire('Guardado', 'SPAM actualizado', 'success');
    }, (err) => {
      console.log(err)
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

}
