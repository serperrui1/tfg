export interface Proveedor {

    nombreEmpresa: string;
    autonomo: boolean;
    sector: string[];
    email: string;
    registroMercantil?: string;
    nif?: string;
    direccion: string;
    cuentaBancaria: string;
    titularCuenta: string;
    productosId: string[];
    uid?: string;
    img?:string
}