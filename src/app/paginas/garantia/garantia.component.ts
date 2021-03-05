import { Component, OnInit } from '@angular/core';
import { Faq } from '../../models/faq';
import { Router } from '@angular/router';
import { FaqService } from '../../services/faq.service';

@Component({
  selector: 'app-garantia',
  templateUrl: './garantia.component.html',
  styleUrls: ['./garantia.component.css']
})
export class GarantiaComponent implements OnInit {

  public faqs: Faq[] = [];
  public garantias: Faq[] = [];
  public grouped: Faq[] = [];
  public cargando: boolean = true;
  public usuario:string;
  public token: string;

  constructor(private faqService : FaqService) { 
      this.usuario =localStorage.getItem('usuario');
      this.token =localStorage.getItem('token');
    }

  async ngOnInit() {
    this.faqs = await (this.faqService.getFaqs());
    for(let faq of this.faqs){
      if(faq.tematica == "Garantía"){
        this.garantias.push(faq);
      }
    }
    this.cargando = false;
    this.grouped  = this.groupByTematica(this.garantias);
  }

  groupByTematica(array){
    return array.reduce((r, a) => {
          r[a.tematica] = r[a.tematica] || [];
          r[a.tematica].push(a);
          return r;
      }, Object.create(null));
  }

}
