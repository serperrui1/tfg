
export class Pedido {

        direccionEnvio: string;
        codigoPostal: number;
        nombreComprador: string;
        fechaCompra: Date;
        producto: string;
        tituloProducto: string;
        categoria: string;
        unidades: number;
        precio: number;
        numeroTelefono:number;        
        proveedor: string;
        comprador: string;
        fechaEsperada: string;
        estadoEnvio:string;
        _id?: string;
        nombreProveedor?: string; 
        
    
}
const pedido:Pedido = new Pedido();