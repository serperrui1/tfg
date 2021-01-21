import { Component, OnInit } from '@angular/core';
import { Faq } from 'src/app/models/faq';
import { FaqService } from 'src/app/services/faq.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styles: [
  ]
})
export class FaqsComponent implements OnInit {

  public faqs: Faq[] = [];
  public cargando: boolean = true;

  constructor(private faqService : FaqService,
    private router:Router) { }

  /* async ngOnInit() {
    this.faqs = await (this.faqService.getFaqs());
  } */

  ngOnInit(): void {
    this.getFaqs();
  }

  getFaqs() {
    this.cargando = true;
    this.faqService.getFaqs()
        .then( faqs => {
          this.cargando = false;
          this.faqs = faqs;
        })
  }

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
            this.getFaqs();
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
