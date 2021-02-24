
export class Pedido {

        direccionEnvio: string;
        codigoPostal: number;
        nombreComprador: string;
        fechaCompra: string;
        producto: string;
        unidades: number;
        precio: number;
        numeroTelefono:number;        
        proveedor: string;
        _id?: string;   
    
}
const pedido:Pedido = new Pedido();