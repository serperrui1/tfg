

export class Comprador {

    constructor(

    public nombre: string,
    public apellidos: string,
    public fechaNacimiento: string,
    public email: string,
    public password: string,
    public paisResidencia: string,
    public ciudad: string,
    public localidad: string,
    public direccionResidencia: string,
    public codigoPostal: number,
    public tarjetaCredito?: string,
    public cuentaPaypal?: string,
    public numeroTelefono?: number,
    public img?: string,
    public google?: boolean,
    public uid?: string
    ){}



}