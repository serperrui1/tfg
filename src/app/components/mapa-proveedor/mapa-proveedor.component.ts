import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Component({
  selector: 'app-mapa-proveedor',
  templateUrl: './mapa-proveedor.component.html',
  styleUrls: ['./mapa-proveedor.component.css']
})
export class MapaProveedorComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  center:any;
  public direccionImagenProveedor = base_url+"/upload/proveedores/"
  mediaEstrellas= 0;
  imagenFirebase:boolean= false;
  noImagen:boolean= false;

  constructor(public dialogRef:MatDialogRef<MapaProveedorComponent>,
    @Inject( MAT_DIALOG_DATA) public data:Proveedor,
     public usuarioService:UsuarioService) {
       console.log(data);
      }

  async ngOnInit() {
    if(this.data.img.length>0){
      if(this.data.img.startsWith("https")){
        this.imagenFirebase = true;
      }else if(this.data.img== ""){
        this.noImagen = true;
      }
    }
    
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
  
   
    async openInfoWindow(marker: MapMarker) {
     
      this.infoWindow.open(marker);
    }
  
  
  }