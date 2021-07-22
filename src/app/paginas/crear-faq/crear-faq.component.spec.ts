import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { CrearFaqComponent } from './crear-faq.component';

import { of } from 'rxjs';
import { SpamValidator } from 'src/app/Validaciones-Customizadas.directive';
import { Comprador } from 'src/app/models/comprador';
import { SpamService } from 'src/app/services/spam.service';
import { FaqService } from 'src/app/services/faq.service';
import { Administrador } from 'src/app/models/administrador';
import { AsistenteTecnico } from 'src/app/models/asistente';

describe('Crear Faq', () => {

  let faqService:FaqService
  let spamService:SpamService
  let fb:FormBuilder
  let component: CrearFaqComponent;
  let fixture: ComponentFixture<CrearFaqComponent>;
  let expresionesSpam = ["spam1", "spam2"]
  let token: string = "token";
  let usuario:string = "usuarioId";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearFaqComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ]

    })
    .compileComponents();
    fixture = TestBed.createComponent(CrearFaqComponent);
    window['gapi'] = {
      load() {
        return null;
      },
      anotherFunction() {
        return null;
      },

    }
    
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.token = token;
    component.usuario = "asistenteTecnico";
    component.expresionesSpam = expresionesSpam;
    

    component.faqForm = fb.group({
      pregunta:['', [Validators.required, SpamValidator(component.expresionesSpam)]],
    
      respuesta:['', [Validators.required, SpamValidator(component.expresionesSpam)]],
      tematica:['Login', [ Validators.required] ]

      });
    faqService = TestBed.inject(FaqService)
    spamService = TestBed.inject(SpamService)

    fixture.detectChanges();

  });

   describe('Formulario Crear Faq', () => {
    it('Formulario: Iniciado correctamente', () => {

      let pregunta = component.faqForm.controls['pregunta']
      let respuesta = component.faqForm.controls['respuesta']
      let tematica = component.faqForm.controls['tematica']



      expect(pregunta.value).toEqual('')
      expect(respuesta.value).toEqual('')
      expect(tematica.value).toEqual('Login')

      expect(component.faqForm.valid).toBeFalsy()


    })

    it('Formulario Válido', () => {

      let pregunta = component.faqForm.controls['pregunta']
      let respuesta = component.faqForm.controls['respuesta']
      let tematica = component.faqForm.controls['tematica']

      pregunta.setValue("Nuevo Faq")
      respuesta.setValue("Respuesta del nuevo Faq")
      tematica.setValue('Login')

      expect(component.faqForm.valid).toBeTruthy();
    })
    it('Formulario NO Válido : Contiene Spam', () => {

      let pregunta = component.faqForm.controls['pregunta']
      let respuesta = component.faqForm.controls['respuesta']
      let tematica = component.faqForm.controls['tematica']

      pregunta.setValue("Nuevo Faq spam1")
      respuesta.setValue("Respuesta del nuevo Faq")
      tematica.setValue('Login')

      expect(component.faqForm.valid).toBeFalsy();
    })
  })
  describe('Elementos HTML ', () => {
  it('Botón para enviar el mensaje', () => {
    let pregunta = component.faqForm.controls['pregunta']
    let respuesta = component.faqForm.controls['respuesta']
    let tematica = component.faqForm.controls['tematica']

    pregunta.setValue("Nuevo Faq")
    respuesta.setValue("Respuesta del nuevo Faq")
    tematica.setValue('Login')

    expect(component.faqForm.valid).toBeTruthy();


    spyOn(component, 'crearFaq')
    const button = fixture.debugElement.nativeElement.querySelector('#submit');
    button.click();
    expect(component.crearFaq).toHaveBeenCalled()
  })
})

});