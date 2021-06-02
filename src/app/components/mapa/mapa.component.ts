import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})

export class MapaComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  center:any;
  productoInfo :Producto = this.data[0];
  proveedor:Proveedor;
  public direccionImagen = base_url+"/upload/productos/"
  public direccionImagenProveedor = base_url+"/upload/proveedores/"
  mediaEstrellas= 0;
  imagenFirebase:boolean= false;
  imagenFirebaseProducto:boolean= false;
  noImagen:boolean = false;
  noImagenProducto:boolean = false;

  constructor( public dialogRef:MatDialogRef<MapaComponent>,
    @Inject( MAT_DIALOG_DATA) public data:Producto[],
     public usuarioService:UsuarioService) {
      
     }

  async ngOnInit(){

  this.proveedor = await this.usuarioService.getProveedorPorID(this.productoInfo.proveedor);
  
    
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

  save(productoId:Producto){
    this.dialogRef.close({
          productoId
    });

  }
  async openInfoWindow(marker: MapMarker, producto:Producto) {
    this.imagenFirebaseProducto = false;
    this.imagenFirebase = false;
    this.noImagen = false;
    this.noImagenProducto = false;
    this.productoInfo = producto;
    if(this.productoInfo.imagenes.length>0){
      if(this.productoInfo.imagenes[0].startsWith("https")){
        this.imagenFirebaseProducto = true;
      }else if(this.productoInfo.imagenes[0]== ""){
        this.noImagenProducto = true;
      }
    }
     this.proveedor = await this.usuarioService.getProveedorPorID(this.productoInfo.proveedor);
    if(this.proveedor.img.length>0){
      if(this.proveedor.img.startsWith("https")){
        this.imagenFirebase = true;
      }else if(this.proveedor.img== ""){
        this.noImagen = true;
      }
    }
 
    console.log(this.proveedor);
    this.productoInfo.proveedorNombre = this.proveedor.nombreEmpresa;
    for(let valoracion of this.productoInfo.valoraciones){
      this.mediaEstrellas = this.mediaEstrellas + valoracion.puntuacion;
    }
    this.infoWindow.open(marker);
  }

  ver(event){
    console.log(event);
  }

  
  
}