import {AbstractControl, ValidatorFn} from '@angular/forms';

/* export function SpamValidator() :ValidatorFn
{
    return (control: AbstractControl): {[key: string]: boolean} | null => {
        if(control.value.trim() == "puta" )
        {
            return {'esSpam':true};
        }
        return null;
    };
} */

export function SpamValidator(expresiones: string[]) :ValidatorFn
{
    return (control: AbstractControl): {[key: string]: boolean} | null => {
        for(let expresion of expresiones){
            if(control.value.trim().includes(expresion)){
              return {'esSpam':true};
            }
        }
        return null;
    };
}