import { Component, OnInit } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-guardar-localizacion',
  templateUrl: './guardar-localizacion.component.html',
  styleUrls: ['./guardar-localizacion.component.css']
})
export class GuardarLocalizacionComponent {
  center:any;

  constructor( public dialogRef:MatDialogRef<GuardarLocalizacionComponent>) {

  this.center = {
    lat: 37.386892,
    lng:  -5.984658
  }
   }


   elegirLocalizacion(event){
    console.log(event);

    
  }

  save(){
    this.dialogRef.close({
          position : this.center
    });
  }


}
