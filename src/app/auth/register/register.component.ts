import { Component} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'
  ]
})
export class RegisterComponent{
  constructor(private router:Router){}

  registrarComprador(){
    this.router.navigateByUrl('/register/comprador');
  }

  registrarProveedor(){
    this.router.navigateByUrl('/register/proveedor');
  }
}
