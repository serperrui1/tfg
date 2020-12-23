import { DatosTecnicos } from './datosTecnicos';
export interface Producto {
    _id: string;
    titulo: string;
    descripcion: string;
    categoria: string;
    subcategoria?: string;
    unidadesMinimas: number;
    stock: number;
    imagenes: string[];
    precio: number;
    datosTecnicos: DatosTecnicos[];
    proveedorNombre: string;
    proveedor: string;

}