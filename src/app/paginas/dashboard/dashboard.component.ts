import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Administrador } from '../../models/administrador';
import { Proveedor } from '../../models/proveedor';
import { UsuarioService } from '../../services/usuario.service';
import { ProductoService } from '../../services/producto.service';
import { PedidosService } from '../../services/pedidos.service';
import { Producto } from '../../models/producto';
import { Pedido } from 'src/app/models/pedido';
import { Comprador } from '../../models/comprador';
import {Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

declare var $: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  p: number = 1;
  p2: number = 1;

  public visible = "pedidos";
  public administrador: Administrador;
  public proveedor: Proveedor;
  public compName: string;
  public provName: string;
  public producto: Producto;
  public productoId: string;
  public productoId2: string;
  public productoTitulo: string;
  public todosProductos: Producto[] = [];
  public misProductos: Producto[] = [];
  public pedidos: Pedido[] = [];
  public todosPedidos: Pedido[] = [];
  public sortedData: Pedido[];
  public sortedData2: Producto[];
  public datosTablaProductos: Producto[] = [];
  public sortedData3: Producto[] = [];
  public data3: Producto[] = [];
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
  public colProd: Producto[];
  public colVent: number[];
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
  public chartDatasetsCopia: Array<any> = [{ data: [] }, { data: [] }];
  public chartDatasetsB: Array<any> = [{ data: [] }];
  public chartDatasetsVentasCopia: Array<any> = [{ data: [] }];
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

  public buscadorPedidos = this.fb.group({
    nombre:[''],
    busqueda:['producto'],
    año:["2021"],
    meses:['todo'],
    categoria:['todas']
  });

  public buscadorProductos = this.fb.group({
    nombre:[''],
    busqueda:['producto'],
    año:["2021"],
    meses:['todo'],
    categoria:['todas']
  });

  public filtroGraficaRegistros = this.fb.group({
    meses:['todo'],
    busqueda:['proveedor'],
    nombre:[''],
    año:["2021"],
    sector:['todos'],
    usuarios:['todos']
  });

  public filtroGraficaVentas = this.fb.group({
    meses:['todo'],
    busqueda:['producto'],
    nombre:[''],
    año:["2021"],
    categoria:['todas']

  });
  
  constructor(private usuarioService: UsuarioService,
    private productoService: ProductoService,
    private pedidoService: PedidosService,
    private fb:FormBuilder
    ) {
      /* this.sortedData = this.todosPedidos.slice();
      this.sortedData2 = this.todosProductos.slice(); */
    }

  async ngOnInit(){
    this.administrador = await this.usuarioService.getAdministrador();
    this.proveedor = await this.usuarioService.getProveedor();
    
    if(this.administrador){
      this.todosPedidos = await this.pedidoService.getPedidos();
      for(let pedido of this.todosPedidos){
        pedido.nombreProveedor = await this.usuarioService.getProveedorNombre(pedido.proveedor)
      }
      
      this.todosProductos = await this.productoService.getProductos();
      this.datosTablaProductos = this.todosProductos;
      // for(let producto of this.datosTablaProductos){
      //   let data1: ProductoConVenta = new ProductoConVenta(null, null);
      //   let numVentas = 0;
      //   for(let pedido of this.todosPedidos){
      //     if(pedido.producto == producto._id){
      //       numVentas = numVentas + 1;
      //     }
      //   }
      //   data1.producto = producto;
      //   data1.ventas = numVentas;
      //   this.data3.push(data1);
      // } 
      this.data3 = this.datosTablaProductos;
    }

    if(this.proveedor){
      this.pedidosProveedor = await this.pedidoService.getMisPedidosProveedor();
      this.misProductos = await this.productoService.getMisProductos();
      this.datosTablaProductos = this.misProductos;
      // for(let producto of this.datosTablaProductos){
      //   let data1: ProductoConVenta = new ProductoConVenta(null, null);
      //   let numVentas = 0;
      //   for(let pedido of this.pedidosProveedor){
      //     if(pedido.producto == producto._id){
      //       numVentas = numVentas + 1;
      //     }
      //   }
      //   data1.producto = producto;
      //   data1.ventas = numVentas;
      //   this.data3.push(data1);
      // } 
      this.data3 = this.data3 = this.datosTablaProductos;
    }
    
    if(this.administrador){
      this.pedidos = await this.pedidoService.getPedidos();
      for(let pedido of this.pedidos){
        pedido.nombreProveedor  = await this.usuarioService.getProveedorNombre(pedido.proveedor)
      }
      this.compradores = await this.usuarioService.getCompradores();
      this.proveedores = await this.usuarioService.getProveedores();
    }
    if(this.administrador || this.proveedor){
      if(this.administrador){

        this.graficaDeRegistros(this.compradores, this.proveedores);
        
        
      }

      else if(this.proveedor){
        this.sortedData = this.pedidosProveedor; 
        for(let pedido of this.pedidosProveedor){
          this.pedidos.push(pedido);
        }
      }

      this.graficaVentas(this.pedidos)

    }
    if(this.administrador){
          
          this.sortedData = this.todosPedidos;
    }
    for( let producto of this.data3){
      producto.proveedorNombre = await this.usuarioService.getProveedorNombre(producto.proveedor)
    }
    this.sortedData3= this.data3;

  }
  graficaDeRegistros(compradores:Comprador[], proveedores:Proveedor[]){
    if(compradores != null){
      for(let comprador of compradores){
        //compradores registrado cada mes del año
        var fecha = new Date(comprador.fechaRegistro);
        if(this.filtroGraficaRegistros.controls['año'].value == "2021"){
          if(fecha.getFullYear() == 2021 ){
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
        if(this.filtroGraficaRegistros.controls['año'].value == "2020"){
          if(fecha.getFullYear() == 2020 ){
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
      }
    }
    
    if(proveedores != null){
      for(let proveedor of proveedores){
        //proveedores registrado cada mes del año
        var fecha = new Date(proveedor.fechaRegistro);
        if(this.filtroGraficaRegistros.controls['año'].value == "2021"){
          if(fecha.getFullYear() == 2021){
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
        if(this.filtroGraficaRegistros.controls['año'].value == "2020"){
          if(fecha.getFullYear() == 2020 ){
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
      }
    }

    this.chartDatasets = [
      { data: [this.EneroC.length, this.FebreroC.length, this.MarzoC.length,
         this.AbrilC.length, this.MayoC.length, this.JunioC.length, this.JulioC.length,
        this.AgostoC.length, this.SeptiembreC.length, this.OctubreC.length, this.NoviembreC.length, this.DiciembreC.length
      ], label: 'Compradores' },
      { data: [this.EneroP.length, this.FebreroP.length, this.MarzoP.length,
        this.AbrilP.length, this.MayoP.length, this.JunioP.length, this.JulioP.length,
       this.AgostoP.length, this.SeptiembreP.length, this.OctubreP.length, this.NoviembreP.length, this.DiciembreP.length
     ], label: 'Proveedores' }
    ];

    this.chartDatasetsCopia = this.chartDatasets;

  }
  graficaVentas(pedidos:Pedido[]){
    console.log(pedidos);
    for(let pedido of pedidos){
    //pedidos realizados cada mes
    if (pedido.fechaCompra != null){
      var fecha = new Date(pedido.fechaCompra);
      if(this.filtroGraficaVentas.controls['año'].value == "2021"){
        if(fecha.getFullYear() == 2021 ){
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
      }if(this.filtroGraficaVentas.controls['año'].value == "2020"){
        if(fecha.getFullYear() == 2020){
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
      
    }
  }

  this.chartDatasetsB = [
    { data: [this.Enero.length, this.Febrero.length, this.Marzo.length,
       this.Abril.length, this.Mayo.length, this.Junio.length, this.Julio.length,
      this.Agosto.length, this.Septiembre.length, this.Octubre.length, this.Noviembre.length, this.Diciembre.length
    ], label: 'Pedidos' }
  ];
      
  this.chartDatasetsVentasCopia = this.chartDatasetsB;
}
  resetMesesVentas(){
    this.Enero = []
    this.Febrero =[];
    this.Marzo =[]; 
    this.Abril=[]; 
    this.Mayo =[];
    this.Junio =[]; 
    this.Julio =[]; 
    this.Agosto =[]; 
    this.Septiembre =[]; 
    this.Octubre =[]; 
    this.Noviembre =[]; 
    this.Diciembre = [];
  }
  resetMesesRegistro(){
    this.EneroC = []
    this.FebreroC =[];
    this.MarzoC =[]; 
    this.AbrilC=[]; 
    this.MayoC =[];
    this.JunioC =[]; 
    this.JulioC =[]; 
    this.AgostoC =[]; 
    this.SeptiembreC =[]; 
    this.OctubreC =[]; 
    this.NoviembreC =[]; 
    this.DiciembreC = [];
    this.EneroP = [];
    this.FebreroP =[];
    this.MarzoP =[]; 
    this.AbrilP=[]; 
    this.MayoP =[];
    this.JunioP =[]; 
    this.JulioP =[]; 
    this.AgostoP =[]; 
    this.SeptiembreP =[]; 
    this.OctubreP =[]; 
    this.NoviembreP =[]; 
    this.DiciembreP = [];
  }




  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  async sortData(sort: Sort) {
    this.p = 1;

    var data = this.todosPedidos;
    if(this.proveedor){
      data = this.pedidosProveedor;
    }

    // if (!sort.active || sort.direction === '') {
    //   this.sortedData = data;
    //   return;
    // }

    this.sortedData = this.sortedData.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'precio': return compare(a.precio, b.precio, isAsc);
        case 'unidades': return compare(a.unidades, b.unidades, isAsc);
        case 'titulo': return compare(a.tituloProducto, b.tituloProducto, isAsc);
        case 'categoria': return compare(a.categoria, b.categoria, isAsc);
        case 'estado': return compare(a.estadoEnvio, b.estadoEnvio, isAsc);
        case 'fecha': return (a.fechaCompra.getTime < b.fechaCompra.getTime ? -1 : 1) * (isAsc ? 1 : -1);
        default: return 0;
      }
      
      
    });

    // for(let i = 0; i< this.sortedData.length; i++){
    //   if(this.administrador){
    //     this.provName = await this.usuarioService.getProveedorNombre(this.sortedData[i].proveedor);
    //     document.getElementById('proveedor'+i).innerHTML = this.provName;
    //   }
    //   this.producto = await this.productoService.getProductoPorID(this.sortedData[i].producto);
    //   document.getElementById('producto'+i).innerHTML = this.producto.titulo;
    // }
    
  }

  sortData2(sort: Sort) {
    this.p2 = 1;
    this.datosTablaProductos = this.todosProductos;
    if(this.proveedor){
      this.datosTablaProductos = this.misProductos;
    }

    // if (!sort.active || sort.direction === '') {
    //   this.sortedData3 = this.data3;
    //   return;
    // }

    this.sortedData3 = this.sortedData3.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'precio': return compare(a.precio, b.precio, isAsc);
        case 'stock': return compare(a.stock, b.stock, isAsc);
        case 'numValoraciones': return compare(a.valoraciones.length, b.valoraciones.length, isAsc);
        case 'numeroVentas': return compare(a.unidadesVendidas, b.unidadesVendidas, isAsc);
        case 'categoria': return compare(a.categoria, b.categoria, isAsc);
        case 'titulo': return compare(a.titulo, b.titulo, isAsc);
        default: return 0;
      }
    });

  }

  activo(activo:string){
    this.visible = activo;
    console.log(activo);
  }

  buscarPedidosAdmin(){
    let pedidos:Pedido[]=[]
    let pedidosPorAño:Pedido[]=[];
    if(this.buscadorPedidos.controls['busqueda'].value == "producto"){
      for(let pedido of this.todosPedidos){
        if(pedido.tituloProducto!= undefined){
          if (pedido.tituloProducto.toLowerCase().includes(
            this.buscadorPedidos.controls['nombre'].value.toLowerCase())) {
            pedidos.push(pedido);
          }
        }
      }
    }
    if(this.buscadorPedidos.controls['busqueda'].value == "proveedor"){
      for(let pedido of this.todosPedidos){
        if(pedido.nombreProveedor!= undefined){
          if (pedido.nombreProveedor.toLowerCase().includes(
            this.buscadorPedidos.controls['nombre'].value.toLowerCase())) {
            pedidos.push(pedido);
          }
        }
      }
      
    }
    if(this.buscadorPedidos.controls['busqueda'].value == "comprador"){
      for(let pedido of this.todosPedidos){
        if(pedido.nombreComprador!= undefined){
          if (pedido.nombreComprador.toLowerCase().includes(
            this.buscadorPedidos.controls['nombre'].value.toLowerCase())) {
            pedidos.push(pedido);
          }
        }
      }
      
    }
    if(this.buscadorPedidos.controls['categoria'].value!= "todas"){
      pedidos = pedidos.filter((e)=> e.categoria == this.buscadorPedidos.controls['categoria'].value);
    }
    
    
    if(this.buscadorPedidos.controls['año'].value == "2021"){
      pedidosPorAño = pedidos.filter((e)=> new Date(e.fechaCompra).getFullYear() == 2021)
    }
    if(this.buscadorPedidos.controls['año'].value == "2020"){
      pedidosPorAño = pedidos.filter((e)=> new Date(e.fechaCompra).getFullYear() == 2020 )
      
    }
    
      if(this.buscadorPedidos.controls['meses'].value == "enero"){
        pedidosPorAño = pedidosPorAño.filter((e)=> new Date(e.fechaCompra).getMonth() === 0);
      }
      if(this.buscadorPedidos.controls['meses'].value == "febrero"){
        pedidosPorAño = pedidosPorAño.filter((e)=> new Date(e.fechaCompra).getMonth() === 1);
      }
      if(this.buscadorPedidos.controls['meses'].value == "marzo"){
        pedidosPorAño = pedidosPorAño.filter((e)=> new Date(e.fechaCompra).getMonth() === 2);
      }
      if(this.buscadorPedidos.controls['meses'].value == "abril"){
        pedidosPorAño = pedidosPorAño.filter((e)=> new Date(e.fechaCompra).getMonth() === 3);
      }
      if(this.buscadorPedidos.controls['meses'].value == "mayo"){
        pedidosPorAño = pedidosPorAño.filter((e)=> new Date(e.fechaCompra).getMonth() === 4);
      }
      if(this.buscadorPedidos.controls['meses'].value == "junio"){
        pedidosPorAño = pedidosPorAño.filter((e)=> new Date(e.fechaCompra).getMonth() === 5);
      }
      if(this.buscadorPedidos.controls['meses'].value == "julio"){
        pedidosPorAño = pedidosPorAño.filter((e)=> new Date(e.fechaCompra).getMonth() === 6);
      }
      if(this.buscadorPedidos.controls['meses'].value == "agosto"){
        pedidosPorAño = pedidosPorAño.filter((e)=> new Date(e.fechaCompra).getMonth() === 7);
      }
      if(this.buscadorPedidos.controls['meses'].value == "septiembre"){
        pedidosPorAño = pedidosPorAño.filter((e)=> new Date(e.fechaCompra).getMonth() === 8);
      }
      if(this.buscadorPedidos.controls['meses'].value == "octubre"){
        pedidosPorAño = pedidosPorAño.filter((e)=> new Date(e.fechaCompra).getMonth() === 9);
      }
      if(this.buscadorPedidos.controls['meses'].value == "noviembre"){
        pedidosPorAño = pedidosPorAño.filter((e)=> new Date(e.fechaCompra).getMonth() === 10);
      }
      if(this.buscadorPedidos.controls['meses'].value == "diciembre"){
        pedidosPorAño = pedidosPorAño.filter((e)=> new Date(e.fechaCompra).getMonth() === 11);
      }
    
    this.sortedData = pedidosPorAño;
    
      
  }
  buscarProductosAdmin(){
    let productos:Producto[]=[];
    if(this.buscadorProductos.controls['busqueda'].value == "producto"){
      for(let producto of this.data3){
        if(producto.titulo!= undefined){
          if (producto.titulo.toLowerCase().includes(
            this.buscadorProductos.controls['nombre'].value.toLowerCase())) {
              productos.push(producto);
          }
        }
        
      }
    }
    if(this.buscadorProductos.controls['busqueda'].value == "proveedor"){
      productos = this.data3.filter((e)=> e.proveedorNombre.toLowerCase().includes(this.buscadorProductos.controls['nombre'].value.toLowerCase()))
      
    }
    if(this.buscadorProductos.controls['categoria'].value == "todas"){
      productos = productos;
    }else{
      productos = productos.filter((e)=> e.categoria == this.buscadorProductos.controls['categoria'].value)
      
    }
    
    this.sortedData3 = productos;
    
      
  }

  buscarPedidosProveedor(){
    let pedidos:Pedido[]=[]
    if(this.buscadorPedidos.controls['busqueda'].value == "producto"){
      for(let pedido of this.pedidosProveedor){
        if(pedido.tituloProducto!= undefined){
          if (pedido.tituloProducto.toLowerCase().includes(
            this.buscadorPedidos.controls['nombre'].value.toLowerCase())) {
            pedidos.push(pedido);
          }
        }
      }
    }
    
    this.sortedData = pedidos;
      
  }

  buscarProductosProveedor(){
    let productos:Producto[]=[]
    if(this.buscadorProductos.controls['busqueda'].value == "producto"){
      for(let producto of this.datosTablaProductos){
        if(producto.titulo!= undefined){
          if (producto.titulo.toLowerCase().includes(
            this.buscadorProductos.controls['nombre'].value.toLowerCase())) {
              productos.push(producto);
          }
        }
        
      }
    }
    
    this.sortedData3 = productos;
    
      
  }
  filtrarGraficaRegistros(){
    this.resetMesesRegistro();
    let proveedores;
    let compradores;
    if(this.filtroGraficaRegistros.controls['usuarios'].value=="todos"){
      compradores = this.compradores;
      if(this.filtroGraficaRegistros.controls['sector'].value=="todos"){
        proveedores = this.proveedores
      }else{
        proveedores = this.proveedores.filter((e)=>e.sector == this.filtroGraficaRegistros.controls['sector'].value );
      }
    }else if(this.filtroGraficaRegistros.controls['usuarios'].value=="compradores"){
      compradores = this.compradores;
      proveedores = [];
    }else if(this.filtroGraficaRegistros.controls['usuarios'].value=="proveedores"){
      if(this.filtroGraficaRegistros.controls['sector'].value=="todos"){
        proveedores = this.proveedores
      }else{
        proveedores = this.proveedores.filter((e)=>e.sector == this.filtroGraficaRegistros.controls['sector'].value );
      }
      compradores = [];
    }
    
    
    this.graficaDeRegistros(compradores, proveedores);
    
    if (this.filtroGraficaRegistros.controls['meses'].value == "todo") {
      this.chartDatasets = this.chartDatasetsCopia;
    }
    if (this.filtroGraficaRegistros.controls['meses'].value == "enero") {
      this.chartDatasets = [
        { data: [this.chartDatasetsCopia[0].data[0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Compradores' },
        { data: [this.chartDatasetsCopia[1].data[0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Proveedores' }

      ];
    }
    if (this.filtroGraficaRegistros.controls['meses'].value == "febrero") {
      this.chartDatasets = [
        { data: [ 0, this.chartDatasetsCopia[0].data[1], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Compradores' },
        { data: [ 0, this.chartDatasetsCopia[1].data[1], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Proveedores' }

      ];
    }
    if (this.filtroGraficaRegistros.controls['meses'].value == "marzo") {
      this.chartDatasets = [
        { data: [ 0, 0, this.chartDatasetsCopia[0].data[2], 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Compradores' },
        { data: [ 0, 0, this.chartDatasetsCopia[1].data[2], 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Proveedores' }

      ];
    }
    if (this.filtroGraficaRegistros.controls['meses'].value == "abril") {
      this.chartDatasets = [
        { data: [ 0, 0, 0, this.chartDatasetsCopia[0].data[3], 0, 0, 0, 0, 0, 0, 0, 0], label: 'Compradores' },
        { data: [ 0, 0, 0, this.chartDatasetsCopia[1].data[3], 0, 0, 0, 0, 0, 0, 0, 0], label: 'Proveedores' }

      ];
    }
    if (this.filtroGraficaRegistros.controls['meses'].value == "mayo") {
      this.chartDatasets = [
        { data: [ 0, 0, 0, 0, this.chartDatasetsCopia[0].data[4], 0, 0, 0, 0, 0, 0, 0], label: 'Compradores' },
        { data: [ 0, 0, 0, 0, this.chartDatasetsCopia[1].data[4], 0, 0, 0, 0, 0, 0, 0], label: 'Proveedores' }

      ];
    }
    if (this.filtroGraficaRegistros.controls['meses'].value == "junio") {
      this.chartDatasets = [
        { data: [ 0, 0, 0, 0, 0, this.chartDatasetsCopia[0].data[5], 0, 0, 0, 0, 0, 0], label: 'Compradores' },
        { data: [ 0, 0, 0, 0, 0, this.chartDatasetsCopia[1].data[5], 0, 0, 0, 0, 0, 0], label: 'Proveedores' }

      ];
    }
    if (this.filtroGraficaRegistros.controls['meses'].value == "julio") {
      this.chartDatasets = [
        { data: [ 0, 0, 0, 0, 0, 0, this.chartDatasetsCopia[0].data[6], 0, 0, 0, 0, 0], label: 'Compradores' },
        { data: [ 0, 0, 0, 0, 0, 0, this.chartDatasetsCopia[1].data[6], 0, 0, 0, 0, 0], label: 'Proveedores' }

      ];
    }
    if (this.filtroGraficaRegistros.controls['meses'].value == "agosto") {
      this.chartDatasets = [
        { data: [ 0, 0, 0, 0, 0, 0, 0, this.chartDatasetsCopia[0].data[7], 0, 0, 0, 0], label: 'Compradores' },
        { data: [ 0, 0, 0, 0, 0, 0, 0, this.chartDatasetsCopia[1].data[7], 0, 0, 0, 0], label: 'Proveedores' }

      ];
    }
    if (this.filtroGraficaRegistros.controls['meses'].value == "septiembre") {
      this.chartDatasets = [
        { data: [ 0, 0, 0, 0, 0, 0, 0, 0, this.chartDatasetsCopia[0].data[8], 0, 0, 0], label: 'Compradores' },
        { data: [ 0, 0, 0, 0, 0, 0, 0, 0, this.chartDatasetsCopia[1].data[8], 0, 0, 0], label: 'Proveedores' }

      ];
    }
    if (this.filtroGraficaRegistros.controls['meses'].value == "octubre") {
      this.chartDatasets = [
        { data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, this.chartDatasetsCopia[0].data[9], 0, 0], label: 'Compradores' },
        { data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, this.chartDatasetsCopia[1].data[9], 0, 0], label: 'Proveedores' }

      ];
    }
    if (this.filtroGraficaRegistros.controls['meses'].value == "noviembre") {
      this.chartDatasets = [
        { data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.chartDatasetsCopia[0].data[10], 0], label: 'Compradores' },
        { data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.chartDatasetsCopia[1].data[10], 0], label: 'Proveedores' }

      ];
    }
    if (this.filtroGraficaRegistros.controls['meses'].value == "diciembre") {
      this.chartDatasets = [
        { data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.chartDatasetsCopia[0].data[11]], label: 'Compradores' },
        { data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.chartDatasetsCopia[1].data[11]], label: 'Proveedores' }

      ];
    }
  }

  filtrarGraficaVentas(){
    this.resetMesesVentas();
    let ventas:Pedido[] = [];
    if(this.filtroGraficaVentas.controls['busqueda'].value == "proveedor"){
      
        for(let venta of this.pedidos){
          if(venta.nombreProveedor!= undefined){
          if(venta.nombreProveedor.toLowerCase().includes(this.filtroGraficaVentas.controls['nombre'].value.toLowerCase())){
            ventas.push(venta)
          }
        }
        }
    }
    if(this.filtroGraficaVentas.controls['busqueda'].value == "producto"){
      for(let venta of this.pedidos){
        if(venta.tituloProducto!= undefined){
        if(venta.tituloProducto.toLowerCase().includes(this.filtroGraficaVentas.controls['nombre'].value.toLowerCase())){
          ventas.push(venta)
        }
      }
      }
    }
    if(this.filtroGraficaVentas.controls['busqueda'].value == "comprador"){
      for(let venta of this.pedidos){
        if(venta.tituloProducto!= undefined){
        if(venta.nombreComprador.toLowerCase().includes(this.filtroGraficaVentas.controls['nombre'].value.toLowerCase())){
          ventas.push(venta)
        }
      }
      }
    }
    if(this.filtroGraficaVentas.controls['categoria'].value!= "todas"){
      ventas = ventas.filter((e)=> e.categoria == this.filtroGraficaVentas.controls['categoria'].value )
    }
    

    this.graficaVentas(ventas);




    if (this.filtroGraficaVentas.controls['meses'].value == "todo") {
      this.chartDatasetsB = this.chartDatasetsVentasCopia;
    }
    if (this.filtroGraficaVentas.controls['meses'].value == "enero") {
      this.chartDatasetsB = [
        { data: [this.chartDatasetsVentasCopia[0].data[0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Pedidios' }
      ];
    }
    if (this.filtroGraficaVentas.controls['meses'].value == "febrero") {
      this.chartDatasetsB = [
        { data: [ 0, this.chartDatasetsVentasCopia[0].data[1], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Pedidios' }
      ];
    }
    if (this.filtroGraficaVentas.controls['meses'].value == "marzo") {
      this.chartDatasetsB = [
        { data: [ 0, 0, this.chartDatasetsVentasCopia[0].data[2], 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Pedidios' }
      ];
    }
    if (this.filtroGraficaVentas.controls['meses'].value == "abril") {
      this.chartDatasetsB = [
        { data: [ 0, 0, 0, this.chartDatasetsVentasCopia[0].data[3], 0, 0, 0, 0, 0, 0, 0, 0], label: 'Pedidios' }
      ];
    }
    if (this.filtroGraficaVentas.controls['meses'].value == "mayo") {
      this.chartDatasetsB = [
        { data: [ 0, 0, 0, 0, this.chartDatasetsVentasCopia[0].data[4], 0, 0, 0, 0, 0, 0, 0], label: 'Pedidios' }
      ];
    }
    if (this.filtroGraficaVentas.controls['meses'].value == "junio") {
      this.chartDatasetsB = [
        { data: [ 0, 0, 0, 0, 0, this.chartDatasetsVentasCopia[0].data[5], 0, 0, 0, 0, 0, 0], label: 'Pedidios' }
      ];
    }
    if (this.filtroGraficaVentas.controls['meses'].value == "julio") {
      this.chartDatasetsB = [
        { data: [ 0, 0, 0, 0, 0, 0, this.chartDatasetsVentasCopia[0].data[6], 0, 0, 0, 0, 0], label: 'Pedidios' }
      ];
    }
    if (this.filtroGraficaVentas.controls['meses'].value == "agosto") {
      this.chartDatasetsB = [
        { data: [ 0, 0, 0, 0, 0, 0, 0, this.chartDatasetsVentasCopia[0].data[7], 0, 0, 0, 0], label: 'Pedidios' }
      ];
    }
    if (this.filtroGraficaVentas.controls['meses'].value == "septiembre") {
      this.chartDatasetsB = [
        { data: [ 0, 0, 0, 0, 0, 0, 0, 0, this.chartDatasetsVentasCopia[0].data[8], 0, 0, 0], label: 'Pedidios' }
      ];
    }
    if (this.filtroGraficaVentas.controls['meses'].value == "octubre") {
      this.chartDatasetsB = [
        { data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, this.chartDatasetsVentasCopia[0].data[9], 0, 0], label: 'Pedidios' }
      ];
    }
    if (this.filtroGraficaVentas.controls['meses'].value == "noviembre") {
      this.chartDatasetsB = [
        { data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.chartDatasetsVentasCopia[0].data[10], 0], label: 'Pedidios' }
      ];
    }
    if (this.filtroGraficaVentas.controls['meses'].value == "diciembre") {
      this.chartDatasetsB = [
        { data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.chartDatasetsVentasCopia[0].data[11]], label: 'Pedidios' }
      ];
    }
  }
  marcarEnviado(pedido:Pedido){
    Swal.fire({
      text: '¿Desea confirmar la entrega del pedido?',
      showCancelButton: true,
      confirmButtonText: `Sí`, 
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoService.actualizarEnvio(pedido._id,"Enviado")
        
      }
    });
  }

  }

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

