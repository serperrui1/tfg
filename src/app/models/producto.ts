import { DatosTecnicos } from './datosTecnicos';
export interface Producto {

    titulo: string;
    descripcion: string;
    categoria: string;
    subcategoria?: string;
    undMinimas: number;
    stock: number;
    imagenes: string[];
    precio: number;
    datosTecnicos: DatosTecnicos[];
    proveedorNombre: string;
    proveedor: string;

}