import { Component, OnInit } from '@angular/core';
import { Faq } from 'src/app/models/faq';
import { FaqService } from 'src/app/services/faq.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  public faqs: Faq[] = [];
  public grouped: Faq[] = [];
  public cargando: boolean = true;
  public usuario:string;
  public token: string;

  constructor(private faqService : FaqService,
    private router:Router) { 
      this.usuario =localStorage.getItem('usuario');
      this.token =localStorage.getItem('token');
    }

  /* async ngOnInit() {
    this.faqs = await (this.faqService.getFaqs());
  } */

  async ngOnInit() {
    /* this.getFaqs(); */
    this.faqs = await (this.faqService.getFaqs());
    this.cargando = false;
    console.log(this.faqs)
    this.grouped  = this.groupByTematica(this.faqs);
  }

  /* getFaqs() {
    this.cargando = true;
    this.faqService.getFaqs()
        .then( faqs => {
          this.cargando = false;
          this.faqs = faqs;
        })
  } */

  nuevoFAQ() {
    this.router.navigate(['/crear-faq/']);
  };

  /* borrarFaq(faq: Faq) {
    console.log(faq._id)
    this.faqService.borrarFaq( faq._id )
        .subscribe( resp => {
          this.getFaqs();
          Swal.fire( 'FAQ borrado', faq.pregunta, 'success' );
        });
  } */

  groupByTematica(array){
    return array.reduce((r, a) => {
          r[a.tematica] = r[a.tematica] || [];
          r[a.tematica].push(a);
          return r;
      }, Object.create(null));
  }

  borrarFaq(faq: Faq) {
    Swal.fire({
      title: '¿Borrar FAQ?',
      text: `Esta a punto de borrar el FAQ con id: ${ faq._id }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo'
    }).then((result) => {
      if (result.value) {
        this.faqService.borrarFaq( faq._id )
          .subscribe( resp => {
            /* this.getFaqs(); */
            this.faqService.getFaqs()
            Swal.fire(
              'FAQ borrado',
              `El FAQ fue borrado correctamente`,
              'success'
            );
          });
      }
    })
  }

}
