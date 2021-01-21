import { DatosTecnicos } from './datosTecnicos';

export class Producto {
    constructor(
    public titulo: string,
    public descripcion: string,
    public categoria: string,
    public unidadesMinimas: number,
    public stock: number,
    public imagenes: string[],
    public precio: number,
    public datosTecnicos: DatosTecnicos[],
    public proveedorNombre: string,
    public proveedor: string,
    public _id?: string,
    public subcategoria?: string,
    ){}
}