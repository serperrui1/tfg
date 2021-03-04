import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  comprador = localStorage.getItem("usuario") === "comprador"

  constructor() { }

  ngOnInit(): void {
  }

}
