import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PagesModule { }
