import { Producto } from "./producto";

export class ProductoConVenta{
    constructor(
    public producto:Producto,
    public ventas:number
    ){}
}
