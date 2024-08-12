import { Servicios } from "./serviciosModel";

export class Venta {
    constructor(idVenta = 0, servicios = [], cotizacion_total = 0, fecha_termino = '', status = '', descripcion = '', createdAt = '', updatedAt = '') {

        this.idVenta = idVenta;
        this.servicios = servicios;
        this.cotizacion_total = cotizacion_total;
        this.fecha_termino = fecha_termino;
        this.status = status;
        this.descripcion = descripcion;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;

    }

    idVenta: number;
    servicios: Servicios[];
    cotizacion_total: number;
    fecha_termino: string;
    status: string;
    descripcion: string;
    createdAt: string;
    updatedAt: string;

}