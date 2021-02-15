import { OnInit, Injectable } from '@angular/core';
import {AbstractControl, ValidatorFn} from '@angular/forms';
import { Spam } from './models/spam';
import { SpamService } from './services/spam.service';



@Injectable()
export class SpumValidator implements OnInit{

  public spam: Spam;
  public expresionesSpam: string[];

  constructor(private spamService: SpamService) { }

  async ngOnInit() {
    this.spam = (await this.spamService.getSpam())[0];
    this.expresionesSpam = this.spam.expresiones;
  }

  checkSpam() :ValidatorFn{
    return (control: AbstractControl): {[key: string]: boolean} | null => {
      for(let expresion of this.expresionesSpam){
        if(control.value.includes(expresion)){
          return {'esSpam':true};
        } else {
        return null;
        }
      }
    };
  }

}
