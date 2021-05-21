import { Component, OnInit } from '@angular/core';
import { Administrador } from '../../models/administrador';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsistenteTecnico } from '../../models/asistente';
import { FaqService } from '../../services/faq.service';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { SpamValidator } from '../../Validaciones-Customizadas.directive';
import { Spam } from '../../models/spam';
import { SpamService } from '../../services/spam.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-faq',
  templateUrl: './crear-faq.component.html',
  styleUrls: ['./crear-faq.component.css'],
/*   providers: [SpumValidator] */
})

export class CrearFaqComponent implements OnInit {

  public faqForm: FormGroup;
  public usuario:string;
  public administrador: Administrador;
  public asistenteTecnico: AsistenteTecnico;
  public token: string;
  formSubmited:boolean = false;
  public spam: Spam;
  public expresionesSpam: string[];

  constructor(private fb:FormBuilder,
    private faqService: FaqService,
    private usuarioService: UsuarioService,
    private spamService: SpamService,
    private router:Router) {
      this.usuario =localStorage.getItem('usuario');
      this.token =localStorage.getItem('token');
     }

  async ngOnInit() {
    if((this.usuario === "administrador" && this.token != null) || (this.usuario === "asistenteTecnico" && this.token != null)){
      this.spam = (await this.spamService.getSpam())[0];
      this.expresionesSpam = this.spam.expresiones;
      this.faqForm = this.fb.group({
        pregunta:['', [Validators.required, SpamValidator(this.expresionesSpam)]],
        /* pregunta:['', [Validators.required, this.spumValidator.checkSpam.bind(this.spumValidator)]], */
        respuesta:['', [Validators.required, SpamValidator(this.expresionesSpam)]],
        tematica:['Login', [ Validators.required] ]
      });
    }else{
      console.log("El usuario no es administrador ni asistente técnico");
    };
  }

  async crearFaq(){
    if(this.faqForm.invalid){
      this.faqForm.markAllAsTouched()
      return;
    }
    this.formSubmited = true;
    await this.faqService.crearFaq(this.faqForm.value)
    .subscribe( () => {
      Swal.fire('Guardado', 'FAQ creado.', 'success');
      this.router.navigateByUrl('/faqs');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  get pregunta()
  {
    return this.faqForm.get('pregunta');
  }

  get respuesta()
  {
    return this.faqForm.get('respuesta');
  }


  campoNoValido (campo:string) :boolean{
    if(this.faqForm.get(campo).invalid && this.formSubmited){
      return true;
    }else{
      return false;
    }
  }

  //Validaciones
  get preguntaNoValido(){
    return this.preguntaCampoRequerido
  }
  get preguntaCampoRequerido(){
    return this.faqForm.get('pregunta').errors ? this.faqForm.get('pregunta').errors.required && this.faqForm.get('pregunta').touched : null
  }
  get respuestaNoValido(){
    return this.respuestaCampoRequerido
  }
  get respuestaCampoRequerido(){
    return this.faqForm.get('respuesta').errors ? this.faqForm.get('respuesta').errors.required && this.faqForm.get('respuesta').touched : null
  }

}
