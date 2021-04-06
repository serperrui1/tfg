
export class Pedido {

        direccionEnvio: string;
        codigoPostal: number;
        nombreComprador: string;
        fechaCompra: Date;
        producto: string;
        unidades: number;
        precio: number;
        numeroTelefono:number;        
        proveedor: string;
        comprador: string;
        _id?: string;   
    
}
const pedido:Pedido = new Pedido();