
export class Pedido {

        direccionEnvio: string;
        codigoPostal: number;
        nombreComprador: string;
        fechaCompra: Date;
        producto: string;
        tituloProducto: string;
        unidades: number;
        precio: number;
        numeroTelefono:number;        
        proveedor: string;
        comprador: string;
        _id?: string;
        nombreProveedor?: string; 
    
}
const pedido:Pedido = new Pedido();