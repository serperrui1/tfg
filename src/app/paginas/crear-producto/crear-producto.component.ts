import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Proveedor } from 'src/app/models/proveedor';
import { ProductoService } from 'src/app/services/producto.service';
import { SubirImagenService } from 'src/app/services/subir-imagen.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment'
import { UsuarioService } from 'src/app/services/usuario.service';
import { Producto } from 'src/app/models/producto';
import { SpamValidator } from '../../Validaciones-Customizadas.directive';
import { Spam } from '../../models/spam';
import { SpamService } from '../../services/spam.service';
const base_url = environment.base_url;

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})

export class CrearProductoComponent implements OnInit{

  public crearProductoForm: FormGroup;
  public usuario:string;
  public proveedor: Proveedor;
  public producto: Producto;
  public token: string;
  public imagenesSubir: File[];
  public imgTemp: any = null;
  formSubmited:boolean = false;
  public spam: Spam;
  public expresionesSpam: string[];
  /* public stock: Number;
  public unidadesMinimas: Number; */

  

  constructor(private fb:FormBuilder,
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    private subirImagenService: SubirImagenService,
    private spamService: SpamService,
    private router:Router) {

      this.usuario =localStorage.getItem('usuario');
      this.token =localStorage.getItem('token');

    }

  async ngOnInit() {
    if(this.usuario === "proveedor" && this.token != null){
      this.spam = (await this.spamService.getSpam())[0];
      this.expresionesSpam = this.spam.expresiones;
      

      this.crearProductoForm = this.fb.group({
        titulo:['', [Validators.required, SpamValidator(this.expresionesSpam)]],
        descripcion:['', [Validators.required, SpamValidator(this.expresionesSpam)]],
        categoria:['Libros, Música, Vídeo y DVD', ],
        unidadesMinimas:['', [Validators.required, this.unidadesMinimasIncorrecto]],
        stock:['', [Validators.required, this.stockIncorrecto]],
        precio:['', [Validators.required, this.precioIncorrecto]],
        subcategoria:['', ],
        datosTecnicos: this.fb.array([this.fb.group({
          datosTecnicosTitulo:['' ],
          datosTecnicosDescripcion:['' ]
      })]),
      });

      this.proveedor = await this.usuarioService.getProveedor();

    }else{
      console.log("El usuario no es un proveedor");
    };
  }

  get datosTecnicos() {
    return this.crearProductoForm.get('datosTecnicos') as FormArray;
  }

  get titulo()
  {
    return this.crearProductoForm.get('titulo');
  }

  get descripcion()
  {
    return this.crearProductoForm.get('descripcion');
  }

  addDatosTecnicos() {
    this.datosTecnicos.push(this.fb.group({
      datosTecnicosTitulo:[' ' ],
      datosTecnicosDescripcion:[' ']}));

  }

  deleteDatosTecnicos(index) {
    this.datosTecnicos.removeAt(index);
  }
  
  async crearProducto(){
    if(this.crearProductoForm.invalid){
      this.crearProductoForm.markAllAsTouched()
      return;
    }
    if(this.imagenesSubir!= undefined){
    this.formSubmited = true;
    const productoId =  await this.productoService.crearProducto(this.crearProductoForm.value);
    
    for(let imagen of this.imagenesSubir)
    this.subirImagenService.postearImagen(imagen, 'productos', productoId)
    .then( () => {
      Swal.fire('Guardado', 'Producto creado.', 'success');
      this.router.navigateByUrl("/producto/"+productoId);

    }).catch( err => {
      Swal.fire('Error', 'No se ha creado el producto, ha habido un error.', 'error');
    });
  }else{
    Swal.fire('Error', 'La foto es obligatoria', 'error');
  }
  }

  

  campoNoValido (campo:string) :boolean{
    if(this.crearProductoForm.get(campo).invalid && this.formSubmited){
      return true;
    }else{
      return false;
    }
  }

  get imagenUrl(){
    if( this.usuario === "proveedor"){
      return `${base_url}/upload/productos/no-image`;
    }
  }

  multiplesImagenes(files: File[]){

    this.imagenesSubir = files;
    
    for(let file of files){
      if ( !file ) { 
        return this.imgTemp = null;
      }  
    const reader = new FileReader();
    reader.readAsDataURL( file );
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
    }
  }

  //Validaciones
  get tituloNoValido(){
    return this.tituloCampoRequerido
  }
  get tituloCampoRequerido(){
    return this.crearProductoForm.get('titulo').errors ? this.crearProductoForm.get('titulo').errors.required && this.crearProductoForm.get('titulo').touched : null
  }


  get descripcionNoValido(){
    return this.descripcionCampoRequerido
  }
  get descripcionCampoRequerido(){
    return this.crearProductoForm.get('descripcion').errors ? this.crearProductoForm.get('descripcion').errors.required && this.crearProductoForm.get('descripcion').touched : null
  }



  get unidadesMinimasNoValido(){
    return this.unidadesMinimasCampoRequerido || this.unidadesMinimasFormato
  }
  get unidadesMinimasCampoRequerido(){
    return this.crearProductoForm.get('unidadesMinimas').errors ? this.crearProductoForm.get('unidadesMinimas').errors.required && this.crearProductoForm.get('unidadesMinimas').touched && this.crearProductoForm.get('stock').touched  : null
  }
  get unidadesMinimasFormato(){
    return this.crearProductoForm.get('unidadesMinimas').errors ? this.crearProductoForm.get('unidadesMinimas').errors.unidadesMinimasIncorrecto && this.crearProductoForm.get('unidadesMinimas').touched && this.crearProductoForm.get('stock').touched : null
  }
  unidadesMinimasIncorrecto = (control:FormControl):{[s:string]:boolean} =>{
    const pattern = "^[0-9]+$"
    let cP = String(control.value);
    let cX = Number(control.value);
    if(!cP.match(pattern) || cX < 0 || cX > this.crearProductoForm.get('stock').value){
      return {
        unidadesMinimasIncorrecto:true
      }
    }
    return null
  }



  get stockNoValido(){
    return this.stockCampoRequerido || this.stockFormato
  }
  get stockCampoRequerido(){
    return this.crearProductoForm.get('stock').errors ? this.crearProductoForm.get('stock').errors.required && this.crearProductoForm.get('stock').touched  : null
  }
  get stockFormato(){
    return this.crearProductoForm.get('stock').errors ? this.crearProductoForm.get('stock').errors.stockIncorrecto && this.crearProductoForm.get('stock').touched : null
  }
  stockIncorrecto = (control:FormControl):{[s:string]:boolean} =>{
    const pattern = "^[0-9]+$"
    let cP = String(control.value);
    let cX = Number(control.value);
    if(!cP.match(pattern) || cX < 0 || cX < this.crearProductoForm.get('unidadesMinimas').value){
      return {
        stockIncorrecto:true
      }
    }
    return null
  }



  get precioNoValido(){
    return this.precioCampoRequerido || this.precioFormato
  }
  get precioCampoRequerido(){
    return this.crearProductoForm.get('precio').errors ? this.crearProductoForm.get('precio').errors.required && this.crearProductoForm.get('precio').touched : null
  }

  get precioFormato(){
    return this.crearProductoForm.get('precio').errors ? this.crearProductoForm.get('precio').errors.precioIncorrecto && this.crearProductoForm.get('precio').touched : null
  }
  private precioIncorrecto(control:FormControl):{[s:string]:boolean}{
    let cX = Number(control.value);
    if(cX < 0){
      return {
        precioIncorrecto:true
      }
    }
    return null
  }

  get imagenRequerido(){
    return this.imagenesSubir == undefined;
  }

  }

