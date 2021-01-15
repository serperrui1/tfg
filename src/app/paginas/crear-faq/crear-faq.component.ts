import { Component, OnInit } from '@angular/core';
import { Administrador } from '../../models/administrador';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsistenteTecnico } from '../../models/asistente';
import { FaqService } from '../../services/faq.service';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-faq',
  templateUrl: './crear-faq.component.html',
  styleUrls: ['./crear-faq.component.css']
})

export class CrearFaqComponent implements OnInit {

  public faqForm: FormGroup;
  public usuario:string;
  public administrador: Administrador;
  public asistenteTecnico: AsistenteTecnico;
  public token: string;
  formSubmited:boolean = false;

  constructor(private fb:FormBuilder,
    private faqService: FaqService,
    private usuarioService: UsuarioService) {

      this.usuario =localStorage.getItem('usuario');
      this.token =localStorage.getItem('token');

     }

  async ngOnInit() {
    if((this.usuario === "administrador" && this.token != null) || (this.usuario === "asistenteTecnico" && this.token != null)){
      this.faqForm = this.fb.group({
        pregunta:['', Validators.required],
        respuesta:['', Validators.required],
        tematica:['Login', [ Validators.required] ]
      });
    }else{
      console.log("El usuario no es administrador ni asistente técnico");
    };
  }

  async crearFaq(){
    this.formSubmited = true;
    console.log(this.faqForm.value);
    if(this.faqForm.invalid){
      return;
    }
    await this.faqService.crearFaq(this.faqForm.value)
    .subscribe( () => {
      Swal.fire('Guardado', 'FAQ creado', 'success');
    }, (err) => {
      console.log(err)
      Swal.fire('Error', err.error.msg, 'error');
    });
  }


  campoNoValido (campo:string) :boolean{
    if(this.faqForm.get(campo).invalid && this.formSubmited){
      return true;
    }else{
      return false;
    }
  }

}
