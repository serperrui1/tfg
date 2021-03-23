export class Incidencia {
    constructor(
    public fechaPublicacion: string,
    public titulo: string,
    public descripcion: string,
    public tematica: string,
    public creadorId: string,
    public asignado?: boolean,
    public resuelto?: boolean,
    public _id?: string,
    public asistenteId?: string,
    public leida?: boolean,
    public ultimoEmisor?: string,
    public mensajes?: string[]
    ){}
}