export interface proveedor {

    nombreEmpresa: string;
    autonomo: boolean;
    sector: string[];
    email: string;
    registroMercantil?: string;
    nif?: string;
    direccion: string;
    cuentaBancaria: string;
    titularCuenta: string;
    paypal?: string;
    tarjetaCredito?: string;
    productosId: string[];

}