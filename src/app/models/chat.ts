export class Chat {
    constructor(
    public fechaPublicacion: string,
    public compradorId: string,
    public proveedorId: string,
    public productoId: string,
    public proveedorNombre: string,
    public leido: boolean,
    public ultimoEmisor: string,
    public mensajes: string[],
    public _id?: string
    ){}
}