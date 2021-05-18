import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';
import { MatDialogRef } from '@angular/material/dialog';
import { MapaComponent } from '../mapa/mapa.component';

@Component({
  selector: 'app-mapa-registro',
  templateUrl: './mapa-registro.component.html',
  styleUrls: ['./mapa-registro.component.css']
})
export class MapaRegistroComponent implements OnInit {

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  center:any;

  constructor( public dialogRef:MatDialogRef<MapaComponent>
    ) {
      
     }

  async ngOnInit(){
    
  if(!navigator.geolocation){
    this.center= {
      lat: 37.386892,
      lng:  -5.984658}
  }else{

  
    navigator.geolocation.getCurrentPosition((position) =>{
      this.center= {
        lat: position.coords.latitude,
        lng:  position.coords.longitude}
        
    });
  }
  }

  save(){
    this.dialogRef.close({
    });

  }
  
  
}