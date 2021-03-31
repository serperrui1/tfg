import { Component, OnInit } from '@angular/core';
import { Administrador } from '../../models/administrador';
import { Proveedor } from '../../models/proveedor';
import { UsuarioService } from '../../services/usuario.service';
import { ProductoService } from '../../services/producto.service';
import { PedidosService } from '../../services/pedidos.service';
import { Producto } from '../../models/producto';
import { Pedido } from 'src/app/models/pedido';
import { Comprador } from '../../models/comprador';
import Chart from 'chart.js' 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public administrador: Administrador;
  public proveedor: Proveedor;
  public todosProductos: Producto[] = [];
  public misProductos: Producto[] = [];
  public pedidos: Pedido[] = [];
  public pedidosProveedor: Pedido[] = [];
  public column = 'precio';
  public reverse = false;
  public reverseclass = 'arrow-up';
  public Enero: Pedido[] = [];
  public Febrero: Pedido[] = [];
  public Marzo: Pedido[] = [];
  public Abril: Pedido[] = [];
  public Mayo: Pedido[] = [];
  public Junio: Pedido[] = [];
  public Julio: Pedido[] = [];
  public Agosto: Pedido[] = [];
  public Septiembre: Pedido[] = [];
  public Octubre: Pedido[] = [];
  public Noviembre: Pedido[] = [];
  public Diciembre: Pedido[] = [];
  public EneroC: Comprador[] = [];
  public FebreroC: Comprador[] = [];
  public MarzoC: Comprador[] = [];
  public AbrilC: Comprador[] = [];
  public MayoC: Comprador[] = [];
  public JunioC: Comprador[] = [];
  public JulioC: Comprador[] = [];
  public AgostoC: Comprador[] = [];
  public SeptiembreC: Comprador[] = [];
  public OctubreC: Comprador[] = [];
  public NoviembreC: Comprador[] = [];
  public DiciembreC: Comprador[] = [];
  public compradores: Comprador[] = [];
  public proveedores: Proveedor[] = [];
  public EneroP: Proveedor[] = [] = [];
  public FebreroP: Proveedor[] = [];
  public MarzoP: Proveedor[] = [];
  public AbrilP: Proveedor[] = [];
  public MayoP: Proveedor[] = [];
  public JunioP: Proveedor[] = [];
  public JulioP: Proveedor[] = [];
  public AgostoP: Proveedor[] = [];
  public SeptiembreP: Proveedor[] = [];
  public OctubreP: Proveedor[] = [];
  public NoviembreP: Proveedor[] = [];
  public DiciembreP: Proveedor[] = [];
  //graficos
  public chartType: string = 'line';
  public chartTypeB: string = 'bar';
  public chartDatasets: Array<any> = [{ data: [] }, { data: [] }];
  public chartDatasetsB: Array<any> = [{ data: [] }];
  /* public chartDatasets: any[] = [{ data: [] }, { data: [] }]; */
  /* public chartDatasets: any[] = [{ data: [] }]; */
  public chartLabels: Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];
  public chartColorsB: Array<any> = [
    {
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };
  
  
  constructor(private usuarioService: UsuarioService,
    private productoService: ProductoService,
    private pedidoService: PedidosService
    ) { }

  async ngOnInit(){
    this.administrador = await this.usuarioService.getAdministrador();
    this.proveedor = await this.usuarioService.getProveedor();
    
    if(this.administrador || this.proveedor){
      if(this.administrador){
        this.pedidos = await this.pedidoService.getPedidos();
        this.compradores = await this.usuarioService.getCompradores();
        this.proveedores = await this.usuarioService.getProveedores();
        if(this.compradores != null){
          for(let comprador of this.compradores){
            //compradores registrado cada mes del año
            if (comprador.fechaRegistro != null){
              var fecha = new Date(comprador.fechaRegistro);
              if(fecha.getMonth() + 1 === 1){
                this.EneroC.push(comprador);
              }else if(fecha.getMonth() + 1 === 2){
                this.FebreroC.push(comprador);
              }else if(fecha.getMonth() + 1 === 3){
                this.MarzoC.push(comprador);
              }else if(fecha.getMonth() + 1 === 4){
                this.AbrilC.push(comprador);
              }else if(fecha.getMonth() + 1 === 5){
                this.MayoC.push(comprador);
              }else if(fecha.getMonth() + 1 === 6){
                this.JunioC.push(comprador);
              }else if(fecha.getMonth() + 1 === 7){
                this.JulioC.push(comprador);
              }else if(fecha.getMonth() + 1 === 8){
                this.AgostoC.push(comprador);
              }else if(fecha.getMonth() + 1 === 9){
                this.SeptiembreC.push(comprador);
              }else if(fecha.getMonth() + 1 === 10){
                this.OctubreC.push(comprador);
              }else if(fecha.getMonth() + 1 === 11){
                this.NoviembreC.push(comprador);
              }else{
                this.DiciembreC.push(comprador);
              }
            }
          }
        }
        
        if(this.proveedores != null){
          for(let proveedor of this.proveedores){
            //proveedores registrado cada mes del año
            if (proveedor.fechaRegistro != null){
              var fecha = new Date(proveedor.fechaRegistro);
              if(fecha.getMonth() + 1 === 1){
                this.EneroP.push(proveedor);
              }else if(fecha.getMonth() + 1 === 2){
                this.FebreroP.push(proveedor);
              }else if(fecha.getMonth() + 1 === 3){
                this.MarzoP.push(proveedor);
              }else if(fecha.getMonth() + 1 === 4){
                this.AbrilP.push(proveedor);
              }else if(fecha.getMonth() + 1 === 5){
                this.MayoP.push(proveedor);
              }else if(fecha.getMonth() + 1 === 6){
                this.JunioP.push(proveedor);
              }else if(fecha.getMonth() + 1 === 7){
                this.JulioP.push(proveedor);
              }else if(fecha.getMonth() + 1 === 8){
                this.AgostoP.push(proveedor);
              }else if(fecha.getMonth() + 1 === 9){
                this.SeptiembreP.push(proveedor);
              }else if(fecha.getMonth() + 1 === 10){
                this.OctubreP.push(proveedor);
              }else if(fecha.getMonth() + 1 === 11){
                this.NoviembreP.push(proveedor);
              }else{
                this.DiciembreP.push(proveedor);
              }
            }
          }
        }
        
        this.chartDatasets = [
          { data: [this.EneroC.length, this.FebreroC.length, this.MarzoC.length,
             this.AbrilC.length, this.MayoC.length, this.JunioC.length, this.JulioC.length,
            this.AgostoC.length, this.SeptiembreC.length, this.OctubreC.length, this.NoviembreC.length, this.DiciembreC.length
          ], label: 'Compradores registrados este año' },
          { data: [this.EneroP.length, this.FebreroP.length, this.MarzoP.length,
            this.AbrilP.length, this.MayoP.length, this.JunioP.length, this.JulioP.length,
           this.AgostoP.length, this.SeptiembreP.length, this.OctubreP.length, this.NoviembreP.length, this.DiciembreP.length
         ], label: 'Proveedores registrados este año' }
        ];
        

      }

      else if(this.proveedor){
        this.pedidosProveedor = await this.pedidoService.getMisPedidosProveedor();
        for(let pedido of this.pedidosProveedor){
          this.pedidos.push(pedido);
        }
      }


      for(let pedido of this.pedidos){
        //pedidos realizados cada mes
        if (pedido.fechaCompra != null){
          var fecha = new Date(pedido.fechaCompra);
          if (fecha.getMonth() + 1 === 1){
            this.Enero.push(pedido);
          }else if(fecha.getMonth() + 1 === 2){
            this.Febrero.push(pedido);
          }else if(fecha.getMonth() + 1 === 3){
            this.Marzo.push(pedido);
          }else if(fecha.getMonth() + 1 === 4){
            this.Abril.push(pedido);
          }else if(fecha.getMonth() + 1 === 5){
            this.Mayo.push(pedido);
          }else if(fecha.getMonth() + 1 === 6){
            this.Junio.push(pedido);
          }else if(fecha.getMonth() + 1 === 7){
            this.Julio.push(pedido);
          }else if(fecha.getMonth() + 1 === 8){
            this.Agosto.push(pedido);
          }else if(fecha.getMonth() + 1 === 9){
            this.Septiembre.push(pedido);
          }else if(fecha.getMonth() + 1 === 10){
            this.Octubre.push(pedido);
          }else if(fecha.getMonth() + 1 === 11){
            this.Noviembre.push(pedido);
          }else{
            this.Diciembre.push(pedido);
          }
        }
      }

      this.chartDatasetsB = [
        { data: [this.Enero.length, this.Febrero.length, this.Marzo.length,
           this.Abril.length, this.Mayo.length, this.Junio.length, this.Julio.length,
          this.Agosto.length, this.Septiembre.length, this.Octubre.length, this.Noviembre.length, this.Diciembre.length
        ], label: 'Pedidos realizados este año' }
      ];
    }
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }


  

  sortColumn(col:string){
    this.column = col;
    if(this.reverse){
      this.reverse = false;
      this.reverseclass = 'arrow-up';
    }else{
      this.reverse = true;
      this.reverseclass = 'arrow-down';
     }
  }

  sortClass(col:string){
    if(this.column == col ){
     if(this.reverse){
      return 'arrow-down'; 
     }else{
      return 'arrow-up';
     }
    }else{
     return '';
    }
   } 

   sortBy(prop: string) {
    return this.pedidos.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  

}
