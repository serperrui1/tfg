import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../models/proveedor';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MapaProveedorComponent } from 'src/app/components/mapa-proveedor/mapa-proveedor.component';
const base_url = environment.base_url;

@Component({
  selector: 'app-escaparate',
  templateUrl: './escaparate.component.html',
  styleUrls: ['./escaparate.component.css']
})
export class EscaparateComponent implements OnInit {

  public proveedor: Proveedor;
  public proveedorId: string;
  public productosProveedor: Producto[] = [];
  public direccionImagen = base_url+"/upload/proveedores/"
  imagenFirebase:boolean=false;
  noImagen:boolean = false;

  constructor(private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private productoService : ProductoService,
    private router: Router,
    public dialog: MatDialog) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.proveedorId = params['id']; 
    });
    this.proveedor = await this.usuarioService.getProveedorPorID(this.proveedorId);
    if(this.proveedor.img.startsWith("https")){
      this.imagenFirebase = true;
    }else if(this.proveedor.img == ""){
      this.noImagen = true;
      console.log(this.noImagen);
    }
    this.productosProveedor = await this.productoService.getProductosPorProveedorId(this.proveedorId);
  }

  verProducto(id: number ){
    this.router.navigate(['/producto', id]);
  }
  openDialog() {
    let dialogRef = this.dialog.open(MapaProveedorComponent,{
      data:this.proveedor
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/producto', result.productoId]);
    })

  }
}
