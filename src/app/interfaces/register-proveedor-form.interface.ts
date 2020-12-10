export interface RegisterProveedorForm{
    nombreEmpresa:string,
    autonomo:boolean,
    email:string,
    password:string,
    password2:string,
    sector:string,
    registroMercantil?:string,
    nif?:string,
    direccion:string,
    cuentaBancariaIBAN:string,
    titularCuenta:string,
    terminos:boolean

}
