import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenenesService {

  constructor(private storage: AngularFireStorage) { }

  public subirCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }


  referenciaCloudStorage(nombreArchivo: string):Promise<string>{
    
    return new Promise<string>((resolve) => {
      let url:any;
      this.storage.ref(nombreArchivo).getDownloadURL().subscribe((URL) => {
         resolve(URL)
      });
      });
    }
}